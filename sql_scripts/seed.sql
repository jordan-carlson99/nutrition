-- Create 20 ingredients
INSERT INTO ingredient (ingredient_carbs, ingredient_protein, ingredient_fat, ingredient_calories, name)
VALUES 
  (10, 5, 2, 90, 'Ingredient 1'),
  (7, 8, 3, 110, 'Ingredient 2'),
  (15, 3, 1, 70, 'Ingredient 3'),
  (8, 12, 4, 150, 'Ingredient 4'),
  (12, 10, 6, 200, 'Ingredient 5'),
  (20, 1, 1, 50, 'Ingredient 6'),
  (5, 20, 10, 250, 'Ingredient 7'),
  (18, 4, 2, 100, 'Ingredient 8'),
  (9, 9, 3, 120, 'Ingredient 9'),
  (14, 6, 7, 180, 'Ingredient 10'),
  (12, 8, 5, 160, 'Ingredient 11'),
  (6, 15, 1, 80, 'Ingredient 12'),
  (8, 10, 2, 100, 'Ingredient 13'),
  (16, 2, 1, 60, 'Ingredient 14'),
  (10, 7, 3, 110, 'Ingredient 15'),
  (11, 9, 5, 130, 'Ingredient 16'),
  (15, 4, 2, 90, 'Ingredient 17'),
  (9, 6, 3, 70, 'Ingredient 18'),
  (13, 5, 1, 110, 'Ingredient 19'),
  (20, 5, 3, 130, 'Ingredient 20');

-- Create 3 users
INSERT INTO account (accountname, password, carb_goal, protein_goal, fat_goal, cal_goal)
VALUES 
  ('user1', 'password1', 50, 100, 60, 1500),
  ('user2', 'password2', 60, 80, 70, 1800),
  ('user3', 'password3', 40, 120, 50, 1400);

INSERT INTO meal (name, meal_carbs, meal_protein, meal_fat, meal_calories)
VALUES 
  ('Meal 1', 0, 0, 0, 0),
  ('Meal 2', 0, 0, 0, 0),
  ('Meal 3', 0, 0, 0, 0);

-- Create 3 meal schedules
INSERT INTO meal_schedule (account_id, meal_id, meal_number, meal_day)
VALUES 
  (1, 1, 1, 1),
  (1, 2, 2, 1),
  (1, 3, 3, 1);

-- Seed meal_item table
INSERT INTO meal_item (meal_id, ingredient_id, quantity)
VALUES
  -- Meal 1 items
  (1, 1, 2),
  (1, 2, 1),
  (1, 3, 0.5),
  -- Meal 2 items
  (2, 2, 1.5),
  (2, 4, 1),
  (2, 5, 1),
  -- Meal 3 items
  (3, 3, 2),
  (3, 6, 1),
  (3, 7, 0.5);
