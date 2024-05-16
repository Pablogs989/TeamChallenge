const Task = require("../models/Task");
const User = require("../models/User");

const TasksController = {
    async create(req, res) {
        try {
            const task = await Task.create({ ...req.body });
            await User.findByIdAndUpdate(req.user._id, { $push: { tasksId: task._id } });
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
    async getByTitle(req, res) {
        try {
            if (req.params.title.length > 25) {
                return res.status(400).send("Search too long")
            }
            const title = new RegExp(req.params.title, "i");
            const tasks = await Task.find({ title });
            res.send(tasks);
        } catch (error) {
            console.error(error);
        }
    },
    async update(req, res) {
        try {
            const task = await Task.findByIdAndUpdate(req.params._id, req.body, { new: true });
            res.send({ msg: 'Task succesfully updated', Task });
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: 'There was a problem updating the task' });
        }
    },
    async delete(req, res) {
        try {
            const task = await Task.findByIdAndDelete(req.params._id);
            res.send({ msg: 'Task delete ', task });
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: 'There was a problem trying to remove the task' });
        }
    },
};

module.exports = TasksController;