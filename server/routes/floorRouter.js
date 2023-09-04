const Router = require('express')
const router = new Router()
const floorController = require('../controllers/floorController')
const userController = require("../controllers/userController");

router.post('/', userController.auth, floorController.add)
router.get('/', floorController.get)
router.get('/one', floorController.getOne)
router.put('/', userController.auth, floorController.update)
router.post('/delete/:id', userController.auth, floorController.delete)

module.exports = router