const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    task: { type: String },
    desc: { type: String },
    status: {
      type: String,
      enum: ["todo", "doing", "done"],
      default: "todo",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dueDate: {
      type: Date,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Task", taskSchema);
