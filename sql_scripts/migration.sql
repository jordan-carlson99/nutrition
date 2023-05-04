DROP TABLE IF EXISTS meal_schedule;
DROP TABLE IF EXISTS meal_item;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS meal;
DROP TABLE IF EXISTS meal_plan;
DROP TABLE IF EXISTS account;

CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  accountname VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  carb_goal FLOAT NOT NULL,
  protein_goal FLOAT NOT NULL,
  fat_goal FLOAT NOT NULL,
  cal_goal FLOAT NOT NULL
);

CREATE TABLE meal_plan (
  id SERIAL PRIMARY KEY,
  account_id INTEGER REFERENCES account(id) NOT NULL,
  total_carbs FLOAT NOT NULL,
  total_protein FLOAT NOT NULL,
  total_fat FLOAT NOT NULL,
  total_calories FLOAT NOT NULL
);

CREATE TABLE meal (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  meal_carbs FLOAT NOT NULL,
  meal_protein FLOAT NOT NULL,
  meal_fat FLOAT NOT NULL,
  meal_calories FLOAT NOT NULL
);

CREATE TABLE ingredient (
  id SERIAL PRIMARY KEY,
  ingredient_carbs FLOAT NOT NULL,
  ingredient_protein FLOAT NOT NULL,
  ingredient_fat FLOAT NOT NULL,
  ingredient_calories FLOAT NOT NULL,
  name varchar(255) NOT NULL
);


CREATE TABLE meal_item (
  meal_id INTEGER REFERENCES meal(id) NOT NULL,
  ingredient_id INTEGER REFERENCES ingredient(id) NOT NULL,
  quantity FLOAT NOT NULL,
  meal_item_carbs FLOAT NOT NULL,
  meal_item_protein FLOAT NOT NULL,
  meal_item_fat FLOAT NOT NULL,
  meal_item_calories FLOAT NOT NULL
);

CREATE TABLE meal_schedule (
  meal_plan_id INTEGER REFERENCES meal_plan(id) NOT NULL,
  meal_id INTEGER REFERENCES meal(id) NOT NULL,
  meal_number INTEGER NOT NULL,
  meal_day INTEGER NOT NULL
);