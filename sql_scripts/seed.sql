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

-- Create 3 meal plans
INSERT INTO meal_plan (account_id, total_carbs, total_protein, total_fat, total_calories)
VALUES 
  (1, 150, 200, 100, 2500),
  (2, 120, 150, 80, 2000),
  (3, 100, 180, 70, 1800);

INSERT INTO meal (name, meal_carbs, meal_protein, meal_fat, meal_calories)
VALUES 
  ('Meal 1', 30, 40, 20, 500),
  ('Meal 2', 40, 50, 30, 700),
  ('Meal 3', 25, 30, 15, 400),
  ('Meal 4', 35, 45, 25, 600),
  ('Meal 5', 20, 25, 10, 300),
  ('Meal 6', 30, 35, 20, 500),
  ('Meal 7', 40, 30, 25, 600),
  ('Meal 8', 25, 20, 10, 350);

-- Create 3 meal schedules
INSERT INTO meal_schedule (meal_plan_id, meal_id, meal_number, meal_day)
VALUES 
  (1, 1, 1, 1),
  (1, 2, 2, 1),
  (1, 3, 3, 1),
  (2, 4, 1, 1),
  (2, 5, 2, 1),
  (2, 6, 3, 1),
  (3, 7, 1, 1),
  (3, 8, 2, 1);