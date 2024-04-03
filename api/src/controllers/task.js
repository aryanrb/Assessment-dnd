const { respond } = require("../utils/response");
const { taskRepository } = require("../repositories");
const io = require("../config/socket");

const all = async (req, res) => {
  const tasks = await taskRepository.all();
  return respond(res, tasks.code, tasks?.message, tasks?.data || {});
};

const single = async (req, res) => {
  const task = await taskRepository.single(req.body.id);
  return respond(res, task.code, task?.message, task?.data || {});
};

const singleUser = async (req, res) => {
  const tasks = await taskRepository.singleUser(req.body.id);
  return respond(res, tasks.code, tasks?.message, tasks?.data || {});
};

const store = async (req, res) => {
  const task = await taskRepository.store(req.body, req.user);
  await io.emit("refetch-all", "refetch");
  return respond(res, task.code, task?.message, task?.data || {});
};

const update = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const task = await taskRepository.update(id, data, req.user);
  await io.emit("refetch-all", "refetch");
  return respond(res, task.code, task?.message, task?.data || {});
};

const updateStatus = async (req, res) => {
  const { id, status } = req.body;

  const task = await taskRepository.updateStatus(id, status, req.user);
  await io.emit("refetch-all", "refetch");
  return respond(res, task.code, task?.message, task?.data || {});
};

const destroy = async (req, res) => {
  const task = await taskRepository.destroy(req.params.id);
  await io.emit("refetch-all", "refetch");
  return respond(res, task.code, task?.message, task?.data || {});
};

module.exports = {
  all,
  store,
  single,
  singleUser,
  update,
  updateStatus,
  destroy,
};
