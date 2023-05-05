import { expect, describe, it } from "vitest";
import dotenv from "dotenv";
dotenv.config();

const testBody = JSON.stringify({
  name: "test from vitest",
  carbs: "35",
  protein: 16,
  fat: 1,
  cals: 150,
});

let api =
  `http://${process.env.apiURL}:${process.env.apiPort}` ||
  `http://localhost:3000`;

describe("api tests", () => {
  it("gets all user data for one account", async () => {
    const result = await fetch(`${api}/user/user1`);
    expect(result.status).toBe(200);
  });
  it("gets all meals, goals, and schedule for one account", async () => {
    const result = await fetch(`${api}/all/user1`);
    expect(result.status).toBe(200);
  });
  it("gets all meals associated to account", async () => {
    const result = await fetch(`${api}/meals/user1`);
    expect(result.status).toBe(200);
  });
  it("gets all meals", async () => {
    const result = await fetch(`${api}/meals`);
    expect(result.status).toBe(200);
  });
  it("gets users goals", async () => {
    const result = await fetch(`${api}/goals/user1`);
    expect(result.status).toBe(200);
  });
  it("adds a meal", async () => {
    const result = await fetch(`${api}/meals`, {
      method: "PUT",
      body: testBody,
      headers: { "Content-Type": "application/json" },
    });
    expect(result.status).toBe(200);
  });
  it("adds an ingredient", async () => {
    const result = await fetch(`${api}/ingredient`, {
      method: "PUT",
      body: testBody,
      headers: { "Content-Type": "application/json" },
    });
    expect(result.status).toBe(200);
  });
});
