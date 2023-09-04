const Router = require('express')
const router = new Router()
const spriteController = require('../controllers/spriteController')
const userController = require("../controllers/userController");

router.get('/', spriteController.get)
router.post('/', userController.auth, spriteController.add)
router.get('/one', spriteController.getOne)
router.put('/', userController.auth, spriteController.update)
router.post('/delete/:id', userController.auth, spriteController.delete)

module.exports = router