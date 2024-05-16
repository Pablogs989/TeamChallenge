const express = require('express')
const router = express.Router()
const { authentication } = require('../middleware/authentication.js')
const TasksController = require('../controllers/TaskController.js')

router.post('/id/:id',authentication,TasksController.create)
router.delete('/id/:id',authentication,TasksController.delete)

module.exports = router