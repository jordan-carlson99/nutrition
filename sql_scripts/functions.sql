CREATE OR REPLACE FUNCTION update_meal_plan_total_carbs()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE meal_plan SET
    total_carbs = (
      SELECT SUM(meal_item_carbs * meal_schedule.quantity)
      FROM meal_schedule
      JOIN meal_item ON meal_schedule.meal_id = meal_item.meal_id
      WHERE meal_schedule.meal_plan_id = NEW.meal_plan_id
        AND meal_item.ingredient_id = NEW.ingredient_id
    )
  WHERE id = NEW.meal_plan_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER update_meal_plan_total_carbs_trigger
AFTER INSERT OR UPDATE OR DELETE ON meal_schedule
FOR EACH ROW
EXECUTE FUNCTION update_meal_plan_total_carbs();