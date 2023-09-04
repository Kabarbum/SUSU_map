const {SpriteTypes} = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

class SpriteTypesController {
    async add(req, res, next) {
        try {
            const {name} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const type = await SpriteTypes.create({name, img: fileName})

            return res.json(type)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async get(req, res, next) {
        try {
            const {id} = req.query
            let data

            if (!id) {
                data = await SpriteTypes.findAll({
                    attributes: ['id', 'name', 'img'],
                })
            } else {
                data = await SpriteTypes.findAll({
                    attributes: ['id', 'name', 'img'],
                    where: {id}
                })
                if (!data.length) return next(ApiError.badRequest('Неправильный тип спрайта'))
            }
            return res.json(data)

        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }

    }

    async update(req, res, next) {
        try {
            const {id} = req.query
            if (!id) {
                return next(ApiError.badRequest('Не указан id'))
            }

            const {name} = req.body
            const data = await SpriteTypes.findOne({where: {id}})

            if (data.name !== name) {
                await data.update({name})
            }

            const files = req.files
            if (files !== null) {
                const img = files.img
                let url = path.resolve(__dirname, '..', 'static', data.img)
                fs.unlink(url, (err) => {
                    if (err) throw err;
                    console.log('Deleted');
                });
                await img.mv(url)
            }

            return res.json(data)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try{
            const {id} = req.params
            if (!id)
                return next(ApiError.badRequest('Не указан id'))

            const data = await SpriteTypes.findOne({
                where: {id}
            })

            let url = path.resolve(__dirname, '..', 'static', data.img)
            fs.unlink(url, (err) => {
                if (err) throw err;
                console.log('Deleted');
            });

            await SpriteTypes.destroy({
                where: {id}
            })
            return res.json({message: 'Удалено успешно'})
        }catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new SpriteTypesController()