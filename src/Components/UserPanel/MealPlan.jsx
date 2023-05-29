import { useEffect, useState } from "react";
import styles from "./UserPanel.module.css";

export default function ChangeMealPlan(props) {
  const [meals, setMeals] = useState(null);
  useEffect(() => {
    const getMeals = async () => {
      const result = await fetch(`${props.api}/meals`);
      const data = await result.json();
      setMeals(data);
      return data;
    };
    getMeals();
  }, []);
  return (
    <div key={`mealchange-1`} id={styles["meal-plan"]}>
      {meals &&
        meals.map((meal) => {
          return <Meal meal={meal} />;
        })}
      <button
        id={styles["meal-plan-close"]}
        onClick={() => {
          props.handleMealPlan();
        }}
      >
        Close
      </button>
    </div>
  );
}

function Meal(props) {
  return (
    <div
      key={`mealplanchange-${props.meal.id}`}
      className={styles["meal-edit-card"]}
    >
      <h3>{props.meal.name}</h3>
      <button>Add/Remove from plan</button>
      <button>Edit Meal</button>
      <div className={styles["meal-macros"]}>
        <p>{`cals: ${props.meal.meal_calories}`}</p>
        <p>{`carbs: ${props.meal.meal_carbs}`}</p>
        <p>{`fat: ${props.meal.meal_fat}`}</p>
        <p>{`protein: ${props.meal.meal_protein}`}</p>
      </div>
    </div>
  );
}
