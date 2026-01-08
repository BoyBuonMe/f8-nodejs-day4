const taskModel = require("@/models/task.model");
const TaskService = require("@/services/task.service");

const getAll = async (req, res) => {
  // const page = req.query.page;
  // console.log(page);
  const data = await TaskService.pagination(+req.query.page, 20, {
    user_id: req.query.user_id
  });
  res.success(data);
};

const getOne = async (req, res) => {
  const data = await taskModel.findOne(+req.params.id);
  if (data) res.success(data);
  else res.error(404, "Tasks not found", data);
};

const createTask = async (req, res) => {
  const data = await taskModel.create(req.body);
  res.success(data);
};

const updateTask = async (req, res) => {
  const data = await taskModel.update(+req.params.id, req.body);
  res.success({
    changedRows: data.changedRows,
  });
};

const deleteTask = async (req, res) => {
  const data = await taskModel.destroy(+req.params.id);
  res.success({
    affectedRows: data.affectedRows,
  });
};

module.exports = { getAll, getOne, createTask, updateTask, deleteTask };
