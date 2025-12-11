try { require("@testing-library/jest-dom/extend-expect"); } catch(e) {}
jest.mock("./src/api/axios", () => {
  const mock = {
    get: jest.fn(() => Promise.resolve({ data: [] })),
    post: jest.fn((url, payload) => {
      if (url && url.includes("/auth/login")) return Promise.resolve({ data: { user: { username: payload?.username || "test" }, token: "test-token" } });
      if (url && url.includes("/auth/register")) return Promise.resolve({ data: { user: { username: payload?.username || "test" }, token: "test-token" } });
      return Promise.resolve({ data: {} });
    }),
    put: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({})),
    create: jest.fn(() => mock)
  };
  return mock;
});