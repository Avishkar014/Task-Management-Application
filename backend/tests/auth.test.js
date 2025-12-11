const request = require("supertest");
const app = require("../src/app");

describe("Auth - register & login", () => {
  const user = { username: `test_${Date.now()}`, password: "password123" };

  test("register returns token + user", async () => {
    const res = await request(app).post("/api/auth/register").send(user);
    expect(res.statusCode === 200 || res.statusCode === 201).toBeTruthy();
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
  });

  test("login returns token", async () => {
    const res = await request(app).post("/api/auth/login").send(user);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("invalid login fails", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: user.username, password: "wrong"
    });
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });
});
