const app = require("../src/config/express");
const supertest = require("supertest");
const request = supertest(app);

describe("Base", () => {
  it("should return 200 when hitting route /", async () => {
    const res = await request.get("/");
    expect(res.statusCode).toEqual(200);
  });
});
