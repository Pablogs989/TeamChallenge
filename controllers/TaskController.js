const Task = require("../models/Task");

const TasksController = {
    async create(req, res) {
		try {
			const task = await Task.create({ ...req.body });
			await User.findByIdAndUpdate(req.user._id, { $push: { tasksIds: {TaskId: task._id} } });
			res.status(201).send(task);
		} catch (error) {
			console.error(error);
			res.status(500).send({ msg: 'There was a problem creating the task' });
		}
	},
    async getAll(req, res) {
		try {
			const { page = 1, limit = 10 } = req.query;
			const tasks = await Task.find()
			.limit(limit)
			.skip((page - 1) * limit);
			res.send(tasks);
		} catch (error) {
			console.error(error);
		}
	},
    async getById(req, res) {
		try {
			const task = await Task.findById(req.params._id)
			res.send(task);
		} catch (error) {
			console.error(error);
		}
	},
    async getByTitle(req,res) {
	  try {
	    if (req.params.title.length>25){
	      return res.status(400).send("Search too long")
	}
	const tittle = new RegExp(req.params.tittle, "i");
	const tasks = await Task.find({tittle});
	res.send(tasks);
	} catch (error) {
	console.error(error);
	}
	},
};

module.exports = TasksController;