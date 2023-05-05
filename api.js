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

// get user info
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
app.get("/all/:accountname", (req, res) => {
  client
    .query(
      `SELECT account.accountname, account.carb_goal, account.protein_goal, account.fat_goal, account.cal_goal,
      meal_schedule.meal_number, meal_schedule.meal_day,
      meal.*
      FROM account
      JOIN meal_schedule ON meal_schedule.account_id=account.id
      JOIN meal ON meal.id=meal_schedule.meal_id
      WHERE account.accountname=$1;`,
      [req.params.accountname]
    )
    .then((result) => {
      res.send(result.rows);
    });
});

// get meals associated to accounts via meal_schedule
app.get("/meals/:accountname", (req, res) => {
  client
    .query(
      `SELECT account.accountname,
      meal_schedule.meal_day,
      meal.name,meal.meal_carbs, meal.meal_protein, meal.meal_fat, meal.meal_calories
      FROM account
      JOIN meal_schedule ON meal_schedule.account_id=account.id
      JOIN meal ON meal.id=meal_schedule.meal_id
      WHERE account.accountname=$1;`,
      [req.params.accountname]
    )
    .then((result) => {
      res.send(result.rows);
    });
});

// get all meals
app.get("/meals", (req, res) => {
  client.query(`SELECT * FROM meal;`).then((result) => {
    res.send(result.rows);
  });
});

// get user's goals
app.get("/goals/:accountname", (req, res) => {
  client
    .query(
      `SELECT carb_goal, protein_goal, fat_goal, cal_goal FROM account WHERE accountname=$1;`,
      [req.params.accountname]
    )
    .then((result) => {
      res.send(result.rows);
    });
});

// put a new meal
app.put("/meals/", (req, res, next) => {
  /* validate data
  body :
  {
    "name": "name",
    "carbs": 14,
    "protein": 16,
    "fat": 1,
    "cals": 150
  } 
   */
  req.body = validateBody(req.body);
  client
    .query(
      `INSERT INTO meal (name, meal_carbs, meal_protein, meal_fat, meal_calories)
  VALUES ($1, $2, $3, $4, $5) RETURNING id;
  `,
      [
        req.body.name,
        req.body.carbs,
        req.body.protein,
        req.body.fat,
        req.body.cals,
      ]
    )
    .then((result) => {
      next(result);
      res.send("success");
    });
  // update meal_schedule
});

app.use((req, res) => {
  console.log(req.params.accountname);
  console.log("good");
});

// put a new ingredient
app.put("/ingredient", (req, res) => {
  /* validate data
  body :
  {
    "name": "name",
    "carbs": 14,
    "protein": 16,
    "fat": 1,
    "cals": 150
  } 
   */
  req.body = validateBody(req.body);
  client
    .query(
      `INSERT INTO ingredient (name, ingredient_carbs, ingredient_protein, ingredient_fat, ingredient_calories) 
    VALUES ($1,$2,$3,$4,$5);`,
      [
        req.body.name,
        req.body.carbs,
        req.body.protein,
        req.body.fat,
        req.body.cals,
      ]
    )
    .then(res.send("success"));
});

function validateBody(body) {
  for (let elem in body) {
    if (elem != "name" && typeof body[elem] != "number") {
      body[elem] = parseFloat(body[elem]);
    }
  }
  return body;
}

app.listen(port, url, () => {
  console.log(`api running on ${url}:${port}`);
});
