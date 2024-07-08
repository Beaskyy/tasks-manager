const Task = require("../models/tasks");

const getAllTasks = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({
      _id: id,
    });
    if (!task) {
      return res.status(404).json({ message: `Task with id: ${id} not found` });
    }
    res.status(200).json({
      id: task._id,
      name: task.name,
      completed: task.completed,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ message: `Task with id: ${id} not found` });
    }
    res.status(200).json({
      id: task._id,
      name: task.name,
      completed: task.completed,
      link: `/tasks/${task._id}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id });

    if (!task) {
      return res.status(404).json({ message: `Task with id: ${id} not found` });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getSingleTask,
};
