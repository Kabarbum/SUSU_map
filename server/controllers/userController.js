const {Users} = require("../models/models");
const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt');

class UserController {
    async login(req, res, next) {
        try {
            const {login, password} = req.body
            console.log(bcrypt.hashSync("Nw@mAm??a{E#lhCn", 10))
            const user = await Users.findOne({
                where: {login}
            })

            if(!user.isAdmin)
                return false

            bcrypt.compare(password, user.password, function(err, result) {
                return res.json(!!result)
            });
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async auth(req, res, next) {
        try {
            const {login, password} = req.body

            const user = await Users.findOne({
                where: {login}
            })

            if(!user.isAdmin)
                return false

            bcrypt.compare(password, user.password, function(err, result) {
                if(result)
                    next()
                else
                    next(ApiError.forbidden("Неверный пароль или имя пользователя"))
            });
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()