const request = require("supertest");
const app = require("../src/app");

describe("Auth middleware protection", () => {
  test("rejects requests without token", async () => {
    const res = await request(app).get("/api/tasks");
    expect([401,403]).toContain(res.statusCode);
  });

  test("rejects invalid token", async () => {
    const res = await request(app).get("/api/tasks").set("Authorization", "Bearer invalid.token");
    expect([401,403]).toContain(res.statusCode);
  });
});
