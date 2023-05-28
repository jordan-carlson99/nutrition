import { useEffect, useState } from "react";

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
    <div key={`mealchange-1`}>
      {meals &&
        meals.map((meal) => {
          return <Meal meal={meal} />;
        })}
      <button
        onClick={() => {
          props.handleMealPlan();
          console.log(meals);
        }}
      >
        Close
      </button>
    </div>
  );
}

function Meal(props) {
  return (
    <div key={`mealplanchange-${props.meal.id}`}>
      <h3>{props.meal.name}</h3>
      <div>
        <p>{`cals: ${props.meal.meal_calories}`}</p>
        <p>{`carbs: ${props.meal.meal_carbs}`}</p>
        <p>{`fat: ${props.meal.meal_fat}`}</p>
        <p>{`protein: ${props.meal.meal_protein}`}</p>
      </div>
    </div>
  );
}
