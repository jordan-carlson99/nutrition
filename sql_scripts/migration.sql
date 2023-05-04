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
  account_id INTEGER REFERENCES account(id) NOT NULL
  -- total_carbs FLOAT NOT NULL,
  -- total_protein FLOAT NOT NULL,
  -- total_fat FLOAT NOT NULL,
  -- total_calories FLOAT NOT NULL
);

CREATE TABLE meal (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  meal_carbs FLOAT,
  meal_protein FLOAT,
  meal_fat FLOAT,
  meal_calories FLOAT
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
  quantity FLOAT NOT NULL
);

CREATE TABLE meal_schedule (
  meal_plan_id INTEGER REFERENCES meal_plan(id) NOT NULL,
  meal_id INTEGER REFERENCES meal(id) NOT NULL,
  meal_number INTEGER NOT NULL,
  meal_day INTEGER NOT NULL
);

CREATE OR REPLACE FUNCTION update_meal_carbs()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE meal SET
    meal_carbs = (
      SELECT SUM(ingredient_carbs * quantity)
      FROM meal_item
      JOIN ingredient ON meal_item.ingredient_id = ingredient.id
      WHERE meal_id = NEW.meal_id
    )
  WHERE id = NEW.meal_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_meal_carbs_trigger
AFTER INSERT OR UPDATE OR DELETE ON meal_item
FOR EACH ROW
EXECUTE FUNCTION update_meal_carbs();

CREATE OR REPLACE FUNCTION update_meal_protein()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE meal SET
    meal_protein = (
      SELECT SUM(ingredient_protein * quantity)
      FROM meal_item
      JOIN ingredient ON meal_item.ingredient_id = ingredient.id
      WHERE meal_id = NEW.meal_id
    )
  WHERE id = NEW.meal_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_meal_protein_trigger
AFTER INSERT OR UPDATE OR DELETE ON meal_item
FOR EACH ROW
EXECUTE FUNCTION update_meal_protein();

CREATE OR REPLACE FUNCTION update_meal_fat()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE meal SET
    meal_fat = (
      SELECT SUM(ingredient_fat * quantity)
      FROM meal_item
      JOIN ingredient ON meal_item.ingredient_id = ingredient.id
      WHERE meal_id = NEW.meal_id
    )
  WHERE id = NEW.meal_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_meal_fat_trigger
AFTER INSERT OR UPDATE OR DELETE ON meal_item
FOR EACH ROW
EXECUTE FUNCTION update_meal_fat();

CREATE OR REPLACE FUNCTION update_meal_calories()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE meal SET
    meal_calories = (
      SELECT SUM(ingredient_calories * quantity)
      FROM meal_item
      JOIN ingredient ON meal_item.ingredient_id = ingredient.id
      WHERE meal_id = NEW.meal_id
    )
  WHERE id = NEW.meal_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_meal_calories_trigger
AFTER INSERT OR UPDATE OR DELETE ON meal_item
FOR EACH ROW
EXECUTE FUNCTION update_meal_calories();