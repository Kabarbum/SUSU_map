const {Walls} = require("../models/models");
const ApiError = require("../error/ApiError");
const sequelize = require('../db')

class WallController {
    async add(req, res, next) {
        try {
            const {floor, points, isPillarBefore, isPillarAfter} = req.body
            const wall = await Walls.create({floor, points, isPillarBefore, isPillarAfter})
            return res.json(wall)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async get(req, res, next) {
        const {floor} = req.query
        if (!floor) {
            return next(ApiError.badRequest('Не указан этаж'))
        }

        const walls = await Walls.findAll({
            where: {floor}
        })
        return res.json(walls)
    }

    async getOne(req, res, next) {
        let {floor, points} = req.query
        points = JSON.parse(points)
        if (!floor) {
            return next(ApiError.badRequest('Не указан этаж'))
        }
        const data = await sequelize.query(
            "SELECT \"id\", \"floor\", \"points\", \"isPillarBefore\", \"isPillarAfter\" " +
            "FROM \"walls\" AS \"walls\" " +
            `WHERE \"walls\".\"floor\" = ${floor} ` +
            `AND \"walls\".\"points\" = '{\"pointA\":${JSON.stringify(points.pointA)},\"pointB\":${JSON.stringify(points.pointB)}}'`,
            {type: sequelize.QueryTypes.SELECT})
        if(data[0] === undefined)
            return res.json(null)
        return res.json(data[0])
    }

    async update(req, res, next) {
        const {id} = req.query
        let {floor, points, isPillarBefore, isPillarAfter} = req.body
        if (!id) {
            return next(ApiError.badRequest('Не указан id'))
        }
        const wall = await Walls.findOne({where: {id}})

        await wall.update({floor, points, isPillarBefore, isPillarAfter})

        return res.json(wall)
    }

    async delete(req, res, next) {
        const {id} = req.params
        if (!id)
            return next(ApiError.badRequest('Не указан id'))

        const wall = await Walls.destroy({
            where: {id}
        })
        return res.json(wall)
    }

}

module.exports = new WallController()