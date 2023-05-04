import express from "express";
const app = express();
import pg from "pg";
const { Client } = pg;
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const connectionString =
  process.env.connectionString ||
  "postgres://username:password@host:port/database";
const url = process.env.apiURL || "127.0.0.1";
const port = process.env.apiPort || 3500;
const client = new Client(connectionString);

client.connect();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("success");
});

app.get("/user/:accountname", (req, res) => {
  client
    .query(`SELECT * FROM account WHERE accountname=$1`, [
      req.params.accountname,
    ])
    .then((result) => {
      res.send(result.rows);
      //   console.log("s");
    });
});

// get all data for account
app.get("/all/:accountname", (req, res) => {});

app.listen(port, url, () => {
  console.log(`api running on ${url}:${port}`);
});
