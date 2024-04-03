const { Task } = require("../models");

const all = async () => {
  try {
    let tasks = await Task.aggregate([
      {
        $match: {
          isDeleted: false, // Filter tasks where isDelete is false
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "assignedTo",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          taskId: "$_id",
          task: 1,
          dueDate: 1,
          desc: 1,
          status: 1,
          userInfo: "$user",
        },
      },
    ]);

    return {
      status: true,
      code: 200,
      message: "Tasks fetched successfully.",
      data: tasks,
    };
  } catch (error) {
    return { status: false, code: 400, message: "Error fetching tasks." };
  }
};

//
const single = async (id) => {
  try {
    let task = await Task.findById({ _id: id });
    if (task) {
      return {
        status: true,
        code: 200,
        message: "Task fetched successfully.",
        data: task,
      };
    }
    return { status: false, code: 404, message: "Task not found." };
  } catch (error) {
    return { status: false, code: 400, message: "Error fetching task." };
  }
};

//
const singleUser = async (id) => {
  try {
    let tasks = await Task.find({ cretedBy: id, isDeleted: false });
    return {
      status: true,
      code: 200,
      message: "Task fetched successfully.",
      data: tasks,
    };
  } catch (error) {
    return { status: false, code: 400, message: "Error fetching task." };
  }
};

const store = async (data, user) => {
  try {
    let taskDetail = await new Task({
      task: data.title,
      desc: data.description,
      status: data.status,
      dueDate: data.deadline,
      assignedTo: data.assignTo,
      updatedBy: user._id,
    });
    await taskDetail.save();
    return {
      status: true,
      code: 200,
      message: "Task added successfully.",
      data: taskDetail,
    };
  } catch (error) {
    return { status: false, code: 400, message: "Error creating new task." };
  }
};

const update = async (id, data, user) => {
  try {
    const { title, description, status, deadline, assignTo } = data;
    let task = await Task.findById({ _id: id });
    if (!task.status) {
      return { status: false, code: 404, message: "Task not found." };
    }
    task.task = title;
    task.desc = description;
    task.status = status;
    task.dueDate = deadline;
    task.assignedTo = assignTo;
    task.updatedBy = user._id;
    task.save();
    return {
      status: true,
      code: 200,
      message: "Task updated successfully.",
      data: task,
    };
  } catch (err) {
    console.log(err);
    return {
      status: true,
      code: 400,
      message: "Error updating task.",
    };
  }
};

const updateStatus = async (id, status, user) => {
  try {
    let task = await Task.findById({ _id: id });
    if (!task.status) {
      return { status: false, code: 404, message: "Task not found." };
    }

    const statusCode = {
      0: "todo",
      1: "doing",
      2: "done",
    };

    task.status = statusCode[status];
    task.updatedBy = user._id;
    task.save();
    return {
      status: true,
      code: 200,
      message: "Task status updated successfully.",
      data: task,
    };
  } catch {
    return {
      status: true,
      code: 400,
      message: "Error updating task status.",
    };
  }
};

const destroy = async (id) => {
  try {
    let task = await Task.findById({ _id: id });

    task.isDeleted = true;
    task.save();
    return {
      status: true,
      code: 200,
      message: "Task deleted successfully.",
      data: task,
    };
  } catch {
    return {
      status: true,
      code: 400,
      message: "Error deleting task.",
    };
  }
};

module.exports = {
  all,
  single,
  singleUser,
  store,
  update,
  updateStatus,
  destroy,
};
