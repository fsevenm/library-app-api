const app = require("../src/config/express");
const db = require("../src/config/sequalize");
const supertest = require("supertest");
const request = supertest(app);

const basePath = "/api/auth";

beforeAll(async () => {
  try {
    await db.authenticate();
  } catch (error) {
    throw error;
  }
});

describe("Register", () => {
  it("should return 422 when sending no payload", async () => {
    const res = await request.post(basePath + "/register");
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("errors");
  });

  it("should successfully register", async () => {
    const res = await request.post(basePath + "/register").send({
      name: "Eric Hernandez",
      email: "ashlee22@yahoo.com",
      password: "k,O:{Qj!a/F{+1px'o",
    });
    expect(res.statusCode).toEqual(201);
  });
});
