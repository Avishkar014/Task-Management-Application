const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "test-secret";

// in-memory stores
const users = new Map(); // username -> { username, password }
const tasks = new Map(); // username -> [ { id, title, description, status } ]

// helper to generate tokens
function signToken(username) {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: "7d" });
}

// register
app.post("/api/auth/register", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: "username and password required" });
  if (users.has(username)) return res.status(409).json({ message: "user exists" });
  users.set(username, { username, password });
  if (!tasks.has(username)) tasks.set(username, []);
  const token = signToken(username);
  return res.status(201).json({ user: { username }, token });
});

// login
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: "username and password required" });
  const u = users.get(username);
  if (!u || u.password !== password) return res.status(401).json({ message: "invalid credentials" });
  const token = signToken(username);
  return res.status(200).json({ user: { username }, token });
});

// auth middleware
function authMiddleware(req, res, next) {
  const h = req.headers.authorization || "";
  const m = h.match(/^Bearer (.+)$/);
  if (!m) return res.status(401).json({ message: "missing token" });
  const token = m[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ message: "invalid token" });
  }
}

// tasks routes (protected)
app.get("/api/tasks", authMiddleware, (req, res) => {
  const username = req.user.username;
  const list = tasks.get(username) || [];
  res.json(list);
});

app.post("/api/tasks", authMiddleware, (req, res) => {
  const username = req.user.username;
  const { title, description = "", status = "pending" } = req.body || {};
  if (!title) return res.status(400).json({ message: "title required" });
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2,8);
  const task = { id, title, description, status };
  const list = tasks.get(username) || [];
  list.push(task);
  tasks.set(username, list);
  res.status(201).json(task);
});

app.put("/api/tasks/:id", authMiddleware, (req, res) => {
  const username = req.user.username;
  const id = req.params.id;
  const patch = req.body || {};
  const list = tasks.get(username) || [];
  const idx = list.findIndex(t => (t.id === id || t._id === id));
  if (idx === -1) return res.status(404).json({ message: "not found" });
  const updated = Object.assign({}, list[idx], patch);
  list[idx] = updated;
  tasks.set(username, list);
  res.json(updated);
});

app.delete("/api/tasks/:id", authMiddleware, (req, res) => {
  const username = req.user.username;
  const id = req.params.id;
  let list = tasks.get(username) || [];
  const before = list.length;
  list = list.filter(t => !(t.id === id || t._id === id));
  tasks.set(username, list);
  const after = list.length;
  if (after === before) return res.status(404).json({ message: "not found" });
  res.status(204).send();
});

// export the app for tests
module.exports = app;

// optional quick start when running node src/app.js directly
if (require.main === module) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log("Server listening on port", port));
}
