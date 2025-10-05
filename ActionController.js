const Car = require("./Car.js")
const ItemService = require("./ItemService.js")
const { sortField } = require('./helper.js')

class ActionController {
    async getAll(req, res) {
        try {
            const item = await ItemService.getAll()
            return res.json(item)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try {
            const item = await ItemService.getOne(req.params.id)
            return res.json(item)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async create(req, res) {
        try {
            if(!req.body){
                return res.sendStatus(400)
            } 
            const item = await ItemService.create(req.body)
            res.json(item)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async delete(req, res) {
        try {
            if(!req.body){
                return res.sendStatus(400)
            }

            ItemService.delete(req.body.id)
                .then( result => res.json({id: req.body.id, message: 'removed'}) )
                .catch( error => res.json({id: req.body.id, message: 'failed'}) )
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async sort(req, res) {
        try {
            if(!req.body){
                return res.sendStatus(400)
            }

            const { field, isReverse } = req.body
            const item = await ItemService.getAll()
            const sortedList = sortField(item, field, isReverse)
            res.json(sortedList)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async filter(req, res) {
        try {
            if(!req.body){
                return res.sendStatus(400)
            }

            const item = await ItemService.filter(req.body)
            res.json(item)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new ActionController()
