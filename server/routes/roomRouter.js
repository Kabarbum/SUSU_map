const Router = require('express')
const router = new Router()
const roomController = require('../controllers/roomController')
const userController = require('../controllers/userController')

router.post('/', userController.auth, roomController.add)
router.get('/', roomController.get)
router.post('/delete', userController.auth, roomController.delete)
router.get('/search', roomController.getOne)

module.exports = router