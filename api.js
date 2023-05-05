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

// get groceries
app.get("/groceries/:accountname", async (req, res) => {
  try {
    let response = await client.query(
      `SELECT account.accountname,
    meal_schedule.meal_id,
    meal_item.quantity,
    ingredient.name
    FROM account
    JOIN meal_schedule ON meal_schedule.account_id=account.id
    JOIN meal_item ON meal_item.meal_id=meal_schedule.meal_id
    JOIN ingredient ON ingredient.id=meal_item.ingredient_id
    WHERE account.accountname=$1;
    `,
      [req.params.accountname]
    );
    res.status(200).send(response.rows);
  } catch (error) {
    console.log(error);
    res.status(400).send("bad request");
  }
});

// put a new meal
app.put("/meals", (req, res) => {
  req.body = validateBody(req.body);
  try {
    client.query(
      `INSERT INTO meal (name, meal_carbs, meal_protein, meal_fat, meal_calories)
  VALUES ($1, $2, $3, $4, $5);
  `,
      [
        req.body.name,
        req.body.carbs,
        req.body.protein,
        req.body.fat,
        req.body.cals,
      ]
    );
    res.status(200).send("success");
  } catch (error) {
    console.log(error);
    console.log(req.headers);
    res.status(400).send("bad request");
  }
});

// put a new ingredient
app.put("/ingredient", (req, res) => {
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

// add user
app.put("/user", (req, res) => {
  try {
    req.body = validateBody(req.body);
    client.query(
      `INSERT INTO account (accountname, password, carb_goal, protein_goal, fat_goal, cal_goal)
  VALUES ($1,$2,$3,$4,$5,$6)`,
      [
        req.body.accountname,
        req.body.password,
        req.body.carbs,
        req.body.protein,
        req.body.fat,
        req.body.cals,
      ]
    );
    res.status(200).send("success");
  } catch (error) {
    console.log(error);
    res.status(400).send("bad request");
  }
});

// update user goals
app.patch("/goals/:accountname", (req, res) => {
  try {
    client.query(
      `UPDATE account SET
    accountname= coalesce($1, accountname),
    password=coalesce($2, password),
    carb_goal=coalesce($3, carb_goal),
    protein_goal=coalesce($4, protein_goal),
    fat_goal=coalesce($5, fat_goal),
    cal_goal=coalesce($6, cal_goal)
    WHERE accountname=$7`,
      [
        req.body.accountname,
        req.body.password,
        req.body.carbs,
        req.body.protein,
        req.body.fat,
        req.body.cals,
        req.params.accountname,
      ]
    );
    res.status(200).send("success");
  } catch (error) {
    console.log(error);
    res.status(400).send("bad request");
  }
});

// update user's meal schedule
app.patch("/schedule/:accountID", (req, res) => {
  try {
    client.query(
      `UPDATE meal_schedule SET 
      meal_id=COALESCE($1, meal_id), 
      meal_number=COALESCE($2,meal_number), 
      meal_day=COALESCE($3, meal_day) 
      WHERE account_id=$4 AND meal_id=$5;`,
      [
        req.body.newMealID,
        req.body.mealNumber,
        req.body.mealDay,
        req.params.accountID,
        req.body.mealID,
      ]
    );
    res.status(200).send("success");
  } catch (error) {
    console.log(error);
    res.status(400).send("bad request");
  }
});

// verify data is correct type
function validateBody(body) {
  for (let elem in body) {
    if (
      elem != "name" &&
      elem != "password" &&
      elem != "accountname" &&
      typeof body[elem] != "number"
    ) {
      body[elem] = parseFloat(body[elem]);
    }
  }
  return body;
}

app.listen(port, url, () => {
  console.log(`api running on ${url}:${port}`);
});
