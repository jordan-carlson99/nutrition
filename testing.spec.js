import { expect, describe, it } from "vitest";
import dotenv from "dotenv";
dotenv.config();

let api =
  `http://${process.env.apiURL}:${process.env.apiPort}` ||
  `http://localhost:3000`;

describe("api tests", () => {
  it("gets all user data for one account", () => {
    // api request
    fetch(`${api}/user/user1`).then((result) => {
      expect(result.status).toBe(400);
    });
  });
  it("gets all meals, goals, and schedule for one account", () => {
    //api request
  });
  it("gets all meals associated to account", () => {
    //
  });
  it("gets all meals", () => {
    // api
  });
  it("gets users goals", () => {
    //api
  });
  it("adds a meal", () => {
    // api
  });
  it("adds an ingredient", () => {
    // api
  });
});
