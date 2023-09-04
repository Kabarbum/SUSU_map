const Router = require('express')
const router = new Router()
const spriteTypesController = require('../controllers/spriteTypesController')
const userController = require("../controllers/userController");

router.post('/', userController.auth, spriteTypesController.add)
router.get('/', spriteTypesController.get)
router.put('/', userController.auth, spriteTypesController.update)
router.post('/delete/:id', userController.auth, spriteTypesController.delete)

module.exports = router