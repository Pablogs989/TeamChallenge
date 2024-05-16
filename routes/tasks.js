const express = require('express')
const router = express.Router()
const { authentication } = require('../middleware/authentication.js')
const TasksController = require('../controllers/TaskController.js')

router.post('/',authentication,TasksController.create)
router.get('/',authentication,TasksController.getAll)
router.get('/id/:_id',authentication,TasksController.getById)
router.get('/title/:title',authentication,TasksController.getByTitle)
//router.put('/id/:_id',authentication,TasksController.update)
//router.delete('/id/:_id',authentication,TasksController.delete)

module.exports = router