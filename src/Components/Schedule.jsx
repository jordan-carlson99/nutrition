import { useEffect, useState } from "react";

const api =
  `http://${import.meta.env.VITE_apiURL}:${import.meta.env.VITE_apiPort}` ||
  "http://localhost:3500/";

export default function Schedule(props) {
  const [mealPlan, setMealPlan] = useState(false);
  useEffect(() => {
    async function getSchedule() {
      let response = await fetch(`${api}/meals/${props.user.accountname}`);
      let data = await response.json();
      let days = {};
      data.map((meal) => {
        if (!days[meal.meal_day]) {
          days[meal.meal_day] = [meal];
        } else {
          days[meal.meal_day].push(meal);
        }
      });
      setMealPlan(Object.values(days));
    }
    getSchedule();
    // console.log(totals);
  }, []);
  return (
    <div className="panel" id="schedule">
      {mealPlan ? (
        mealPlan.map((day) => {
          return <WeekDay data={day} handleTotals={props.handleTotals} />;
        })
      ) : (
        <a>no</a>
      )}
    </div>
  );
}

function WeekDay(props) {
  let breakfast;
  let lunch;
  let dinner;
  let totalCarbs = 0;
  let totalProtein = 0;
  let totalFat = 0;
  let totalCals = 0;
  props.data.forEach((element) => {
    totalCarbs += element.meal_carbs;
    totalProtein += element.meal_protein;
    totalFat += element.meal_fat;
    totalCals += element.meal_calories;
    if (element.meal_number == 1) {
      breakfast = element;
    } else if (element.meal_number == 2) {
      lunch = element;
    } else if (element.meal_number == 3) {
      dinner = element;
    }
  });
  useEffect(() => {
    // horrible
    props.data.forEach((element) => {
      totalCarbs += element.meal_carbs;
      totalProtein += element.meal_protein;
      totalFat += element.meal_fat;
      totalCals += element.meal_calories;
      if (element.meal_number == 1) {
        breakfast = element;
      } else if (element.meal_number == 2) {
        lunch = element;
      } else if (element.meal_number == 3) {
        dinner = element;
      }
    });
    props.handleTotals({
      carbs: totalCarbs,
      protein: totalProtein,
      fat: totalFat,
      cals: totalCals,
    });
  }, []);
  return (
    <div className="week-day" key={props.data.meal_day}>
      <div className="banner">
        <h1 className="banner-title">Monday</h1>
      </div>
      {breakfast ? (
        <div className="breakfast" key={breakfast.id}>
          <h3 className="breakfast-text">Breakfast</h3>
          <h4 className="breakfast-text">{breakfast.name}</h4>
        </div>
      ) : (
        <div className="breakfast">
          <h3 className="breakfast-text">Breakfast</h3>
          <h4 className="breakfast-text">No value</h4>
        </div>
      )}

      {lunch ? (
        <div className="lunch" key={lunch.key}>
          <h3 className="lunch-text">Lunch</h3>
          <h4 className="lunch-text">{lunch.name}</h4>
        </div>
      ) : (
        <div className="lunch">
          <h3 className="lunch-text">Lunch</h3>
          <h4 className="lunch-text">No Value</h4>
        </div>
      )}

      {dinner ? (
        <div className="dinner" key={dinner.key}>
          <h3 className="dinner-text">Dinner</h3>
          <h4 className="dinner-text">{dinner.name}</h4>
        </div>
      ) : (
        <div className="dinner">
          <h3 className="dinner-text">Dinner</h3>
          <h4 className="dinner-text">No Value</h4>
        </div>
      )}
      <div className="daily-totals">
        <p className="daily-totals-text carbs">Carbs: {totalCarbs}</p>
        <p className="daily-totals-text protein">Protein: {totalProtein}</p>
        <p className="daily-totals-text fat">Fat: {totalFat}</p>
        <p className="daily-totals-text cals">Calories: {totalCals}</p>
      </div>
    </div>
  );
}
