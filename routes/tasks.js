const express = require("express");
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getSingleTask,
} = require("../controllers/tasks");
const router = express.Router();

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").patch(updateTask).delete(deleteTask).get(getSingleTask);

module.exports = router;
