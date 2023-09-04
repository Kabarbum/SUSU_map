const Router = require('express')
const router = new Router()
const wallController = require('../controllers/wallController')
const userController = require("../controllers/userController");

router.post('/', userController.auth, wallController.add)
router.get('/', wallController.get)
router.get('/one', wallController.getOne)
router.put('/', userController.auth, wallController.update)
router.post('/delete/:id', userController.auth, wallController.delete)

module.exports = router