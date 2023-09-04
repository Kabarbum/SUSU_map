const {Sprites, SpriteTypes} = require("../models/models");
const ApiError = require("../error/ApiError");

class SpriteController {
    async add(req, res, next) {
        try {
            const {floor, position, spriteTypeId} = req.body
            const sprite = await Sprites.create({floor, position, spriteTypeId})
            return res.json(sprite)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async get(req, res, next) {
        const {floor, position} = req.query
        if (!floor) {
            return next(ApiError.badRequest('Не указан этаж'))
        }
        let data
        if (position)
            data = await Sprites.findOne({
                where: {floor, position: JSON.parse(position)},
                attributes: ['id', 'floor', 'position', 'spriteTypeId'],
                include: [{model: SpriteTypes, attributes: ['img']}]
            })
        else
            data = await Sprites.findAll({
                where: {floor},
                attributes: ['id', 'floor', 'position', 'spriteTypeId'],
                include: [{model: SpriteTypes, attributes: ['img']}]
            })
        return res.json(data)
    }

    async getOne(req, res, next) {
        const {floor, position} = req.query
        if (!floor || !position) {
            return next(ApiError.badRequest('Не указан этаж или позиция'))
        }
        const data = await Sprites.findOne({
            where: {floor, position: JSON.parse(position)},
            attributes: ['id', 'floor', 'position', 'spriteTypeId'],
            include: [{model: SpriteTypes, attributes: ['img']}]
        })
        return res.json(data)
    }

    async update(req, res, next) {
        const {id} = req.query
        const {floor, position, spriteTypeId} = req.body
        if (!id) {
            return next(ApiError.badRequest('Не указан id'))
        }
        const sprite = await Sprites.findOne({where: {id}})

        await sprite.update({floor, position, spriteTypeId})
        return res.json(sprite)
    }

    async delete(req, res, next) {
        const {id} = req.params
        if (!id)
            return next(ApiError.badRequest('Не указан id'))

        const room = await Sprites.destroy({
            where: {id}
        })
        return res.json(room)
    }

}

module.exports = new SpriteController()