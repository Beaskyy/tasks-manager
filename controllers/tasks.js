const getAllTasks = (req, res) => {
  res.json({
    name: "beasky",
    completed: true,
  });
};

const createTask = (req, res) => {
  res.json(req.body);
};

const getSingleTask = (req, res) => {
  res.json({
    id: req.params.id,
  });
};

const updateTask = (req, res) => {
  res.send("Update task");
};

const deleteTask = (req, res) => {
  res.send("Delete task");
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getSingleTask,
};
