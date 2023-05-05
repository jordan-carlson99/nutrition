--- get all the meals a user has + their goals
SELECT account.accountname, account.carb_goal, account.protein_goal, account.fat_goal, account.cal_goal,
meal_schedule.meal_number, meal_schedule.meal_day,
meal.*
FROM account
JOIN meal_schedule ON meal_schedule.account_id=account.id
JOIN meal ON meal.id=meal_schedule.meal_id
WHERE account.accountname='user1';

--- get only meals
SELECT account.accountname,
meal_schedule.meal_day,
meal.name,meal.meal_carbs, meal.meal_protein, meal.meal_fat, meal.meal_calories
FROM account
JOIN meal_schedule ON meal_schedule.account_id=account.id
JOIN meal ON meal.id=meal_schedule.meal_id
WHERE account.accountname='user1';

--- get groceries
SELECT account.accountname,
meal_schedule.meal_id,
meal_item.quantity,
ingredient.name
FROM account
JOIN meal_schedule ON meal_schedule.account_id=account.id
JOIN meal_item ON meal_item.meal_id=meal_schedule.meal_id
JOIN ingredient ON ingredient.id=meal_item.ingredient_id
WHERE account.accountname='user1';
