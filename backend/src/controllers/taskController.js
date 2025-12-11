import Task from "../models/Task.js";

export async function getTasks(req, res) {
  const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
  return res.json(tasks);
}

export async function createTask(req, res) {
  const { title, description, status } = req.body;
  if (!title) return res.status(400).json({ message: "title required" });

  const task = await Task.create({
    title,
    description: description || "",
    status: status || "pending",
    userId: req.user.id
  });

  return res.status(201).json(task);
}

export async function updateTask(req, res) {
  const id = req.params.id;
  const task = await Task.findOne({ _id: id, userId: req.user.id });

  if (!task) return res.status(404).json({ message: "not found" });

  task.title = req.body.title ?? task.title;
  task.description = req.body.description ?? task.description;
  task.status = req.body.status ?? task.status;

  await task.save();
  return res.json(task);
}

export async function deleteTask(req, res) {
  const id = req.params.id;
  const task = await Task.findOne({ _id: id, userId: req.user.id });

  if (!task) return res.status(404).json({ message: "not found" });

  await task.deleteOne();
  return res.json({ id });
}
