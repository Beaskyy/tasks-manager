const { createCustomError } = require("../errors/custom-errors");
const asyncWrapper = require("../middleware/async");
const Task = require("../models/tasks");

const getAllTasks = asyncWrapper(async (req, res) => {
  const task = await Task.find({});
  res.status(200).json(
    task.map((item) => {
      return {
        id: item._id,
        name: item.name,
        completed: item.completed,
        link: `/tasks/${item._id}`,
      };
    })
  );
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOne({
    _id: id,
  });
  if (!task) {
    const error = new Error("Not found");
    return next(createCustomError(`Task with id: ${id} not found`, 404));
  }
  res.status(200).json({
    id: task._id,
    name: task.name,
    completed: task.completed,
  });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`Task with id: ${id} not found`, 404));
  }
  res.status(200).json({
    id: task._id,
    name: task.name,
    completed: task.completed,
    link: `/tasks/${task._id}`,
  });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    return next(createCustomError(`Task with id: ${id} not found`, 404))
  }
  res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getSingleTask,
};
