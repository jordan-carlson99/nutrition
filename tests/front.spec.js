import { expect, describe, it } from "vitest";
import dotenv from "dotenv";
dotenv.config();

const host =
  `http://${process.env.frontEndURL}:${process.env.frontEndPort}` ||
  "http://localhost:3500/";

describe("front end", () => {
  it("serves homepage", async () => {
    let response = await fetch(`${host}/`);
    expect(response.status).toBe(200);
  });
});
