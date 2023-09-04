const Router = require('express')
const router = new Router()
const roomRouter = require('./roomRouter')
const wallRouter = require('./wallRouter')
const floorRouter = require('./floorRouter')
const spriteRouter = require('./spriteRouter')
const spriteTypesRouter = require('./spriteTypesRouter')
const userRouter = require('./userRouter')

router.use('/rooms', roomRouter)
router.use('/walls', wallRouter)
router.use('/floors', floorRouter)
router.use('/sprites', spriteRouter)
router.use('/spriteTypes', spriteTypesRouter)
router.use('/user', userRouter)

module.exports = router