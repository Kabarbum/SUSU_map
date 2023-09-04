const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.post('/auth', userController.login)

module.exports = router