import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import path from "path";

const pathToFile = path.resolve("./");
const api =
  `${process.env.apiURL}:${process.env.apiPort}` || "http://localhost:3500/";
const port = process.env.frontEndPort || 3000;
const url = process.env.frontEndURL || `http://localhost`;

app.use(cors());

app.get("/", (req, res) => {
  try {
    res.sendFile(`${pathToFile}/index.html`);
  } catch (error) {
    console.log(error);
    res.status(400).send("bad request");
  }
});

app.listen(port, url, () => {
  console.log(`fronEnd running at ${url}:${port}`);
});
