const ApiError = require("../error/ApiError");
const {Floors} = require("../models/models");
const sequelize = require("../db");

class FloorController {
    async add(req, res, next) {
        try {
            const {floor, points} = req.body
            const data = await Floors.create({floor, points})
            return res.json(data)
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async get(req, res, next) {
        const {floor} = req.query
        if(!floor){
            return next(ApiError.badRequest('Не указан этаж'))
        }

        const floors = await Floors.findAll({
            attributes:['id','floor','points'],
            where:{floor}
        })
        return res.json(floors)
    }

    async getOne(req, res, next) {
        let {floor, points} = req.query
        points = JSON.parse(points)
        if (!floor) {
            return next(ApiError.badRequest('Не указан этаж'))
        }
        const data = await sequelize.query("SELECT \"id\", \"floor\", \"points\" FROM \"floors\" AS \"floors\" \n" +
            `WHERE \"floors\".\"floor\" = ${floor} \n` +
            `AND \"floors\".\"points\" = '{\"pointA\":${JSON.stringify(points.pointA)},\"pointB\":${JSON.stringify(points.pointB)}}'`,
            {type: sequelize.QueryTypes.SELECT})
        if(data[0] === undefined)
            return res.json(null)
        return res.json(data[0])
    }

    async update(req, res, next) {
        const {id} = req.query
        let {floor, points} = req.body
        if (!id) {
            return next(ApiError.badRequest('Не указан id'))
        }
        const data = await Floors.findOne({where: {id}})

        await data.update({floor, points: points})

        return res.json(data)
    }

    async delete(req, res, next) {
        const {id} = req.params
        if (!id)
            return next(ApiError.badRequest('Не указан id'))

        const floor = await Floors.destroy({
            where: {id}
        })
        return res.json(floor)
    }

}

module.exports = new FloorController()