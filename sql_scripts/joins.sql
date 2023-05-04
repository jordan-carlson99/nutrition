SELECT account.accountname,
meal_schedule.meal_number, meal_schedule.meal_day,
meal.*
FROM account
JOIN meal_plan ON account.id=meal_plan.account_id
JOIN meal_schedule ON meal_plan.id=meal_schedule.meal_plan_id
JOIN meal ON meal.id=meal_schedule.meal_id
WHERE account.accountname='user1';