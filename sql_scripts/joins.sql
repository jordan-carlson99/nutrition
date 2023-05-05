--- get all the meals a user has + their goals
SELECT account.accountname, account.carb_goal, account.protein_goal, account.fat_goal, account.cal_goal,
meal_schedule.meal_number, meal_schedule.meal_day,
meal.*
FROM account
JOIN meal_plan ON account.id=meal_plan.account_id
JOIN meal_schedule ON meal_plan.id=meal_schedule.meal_plan_id
JOIN meal ON meal.id=meal_schedule.meal_id
WHERE account.accountname='user1';

--- get only meals
SELECT account.accountname,
meal_schedule.meal_day,
meal.name,meal.meal_carbs, meal.meal_protein, meal.meal_fat, meal.meal_calories
FROM account
JOIN meal_plan ON account.id=meal_plan.account_id
JOIN meal_schedule ON meal_schedule.meal_plan_id=meal_plan.id
JOIN meal ON meal.id=meal_schedule.meal_id
WHERE account.accountname='user1';