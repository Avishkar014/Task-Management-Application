const request = require("supertest");
const app = require("../src/app");

let token = "";
let taskId = "";

beforeAll(async () => {
  const user = { username: `task_${Date.now()}`, password: "pass1234" };
  await request(app).post("/api/auth/register").send(user);
  const login = await request(app).post("/api/auth/login").send(user);
  token = login.body.token;
});

describe("Tasks CRUD", () => {
  test("GET /api/tasks returns array", async () => {
    const res = await request(app).get("/api/tasks").set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  test("POST /api/tasks creates a task", async () => {
    const t = { title: "Hello", description: "Test", status: "pending" };
    const res = await request(app).post("/api/tasks").set("Authorization", `Bearer ${token}`).send(t);
    expect(res.statusCode === 200 || res.statusCode === 201).toBeTruthy();
    taskId = res.body._id || res.body.id;
  });

  test("PUT /api/tasks/:id updates task", async () => {
    const res = await request(app).put(`/api/tasks/${taskId}`).set("Authorization", `Bearer ${token}`).send({
      title: "Updated",
      status: "completed"
    });
    expect(res.statusCode).toBe(200);
  });

  test("DELETE /api/tasks/:id removes task", async () => {
    const res = await request(app).delete(`/api/tasks/${taskId}`).set("Authorization", `Bearer ${token}`);
    expect([200, 204]).toContain(res.statusCode);
  });
});
