const { Router } = require("express")
const ItemService = require("./ItemService.js")
const router = new Router()
const ActionController = require("./ActionController.js")

router.get('/cars', ActionController.getAll)
router.get('/oneCar/:id', ActionController.getOne)
router.post('/addCar', ActionController.create)
router.delete('/remove', ActionController.delete)
router.post('/sort', ActionController.sort)
router.post('/filter', ActionController.filter)

module.exports = router;
