const ApiError = require('../error/ApiError')
const {Rooms} = require('../models/models')


class RoomController {
    async add(req, res, next) {
        try {
            const {corpus, floor, number, wallColor, floorColor, walls} = req.body
            const check = await Rooms.findOne({
                where: {
                    corpus: corpus.toString(),
                    floor: floor.toString(),
                    number: number.toString()
                }
            })
            if (check !== null) {
                await check.update(
                    {
                        walls: walls,
                    },
                    {
                        where: {
                            corpus: corpus.toString(),
                            floor: floor.toString(),
                            number: number.toString()
                        },
                    }
                )
                return res.json(check)
            }
            else {
                const room = await Rooms.create({corpus, floor, number, wallColor, floorColor, walls})
                return res.json(room)
            }

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async get(req, res, next) {
        const {floor} = req.query
        if (!floor)
            return next(ApiError.badRequest('Не указан этаж'))

        const rooms = await Rooms.findAll({
            attributes: ['id', 'corpus', 'floor', 'number', 'walls', 'wallColor', 'floorColor'],
            where: {floor}
        })

        return res.json(rooms)
    }

    async getOne(req, res, next) {
        const {floor, corpus, number} = req.query
        if (!floor || !corpus || !number)
            return next(ApiError.badRequest('Не указан этаж, корпус или номер'))

        const room = await Rooms.findOne({
            attributes: ['id', 'corpus', 'floor', 'number', 'walls', 'wallColor', 'floorColor'],
            where: {floor, corpus, number}
        })
        if(room)
            return res.json(room)
        return res.json(false)
    }

    async delete(req, res, next) {
        const {floor, corpus, number} = req.query
        if (!floor || !corpus || !number)
            return next(ApiError.badRequest('Не указан этаж, корпус или номер'))

        const room = await Rooms.destroy({
            where: {floor, corpus, number}
        })
        return res.json(room)
    }

}

module.exports = new RoomController()