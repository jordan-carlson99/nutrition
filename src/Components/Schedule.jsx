import { useEffect, useState } from "react";

let api;
if (import.meta.env.VITE_apiPort) {
  api =
    `${import.meta.env.VITE_apiURL}:${import.meta.env.VITE_apiPort}` ||
    "http://localhost:3500/";
} else {
  api = `${import.meta.env.VITE_apiURL}` || "http://localhost:3500/";
}

export default function Schedule(props) {
  const [mealPlan, setMealPlan] = useState(false);
  useEffect(() => {
    async function getSchedule() {
      let response = await fetch(`${api}/meals/${props.user.accountname}`);
      let data = await response.json();
      let days = {};
      let totalCarbs = 0;
      let totalProtein = 0;
      let totalFat = 0;
      let totalCals = 0;
      data.map((meal) => {
        totalCarbs += meal.meal_carbs;
        totalProtein += meal.meal_protein;
        totalFat += meal.meal_fat;
        totalCals += meal.meal_calories;
        if (!days[meal.meal_day]) {
          days[meal.meal_day] = [meal];
        } else {
          days[meal.meal_day].push(meal);
        }
      });
      setMealPlan(Object.values(days));
      props.handleTotals({
        carbs: totalCarbs,
        protein: totalProtein,
        fat: totalFat,
        cals: totalCals,
      });
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
  const weekDays = {
    1: "Sun",
    2: "Mon",
    3: "Tues",
    4: "Wed",
    5: "Thur",
    6: "Fri",
    7: "Sat",
  };
  let breakfast;
  let lunch;
  let dinner;
  let day;
  let totalCarbs = 0;
  let totalProtein = 0;
  let totalFat = 0;
  let totalCals = 0;
  props.data.forEach((element) => {
    totalCarbs += element.meal_carbs;
    totalProtein += element.meal_protein;
    totalFat += element.meal_fat;
    totalCals += element.meal_calories;
    day = weekDays[element.meal_day];
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
    // props.handleTotals({
    //   carbs: totalCarbs,
    //   protein: totalProtein,
    //   fat: totalFat,
    //   cals: totalCals,
    // });
  }, []);
  return (
    <div className="week-day" key={props.data.meal_day}>
      <div className="banner">
        <h1 className="banner-title">{day}</h1>
      </div>
      <div className="weekday-body">
        {breakfast ? (
          <div className="meal" key={breakfast.id}>
            <h3 className="breakfast-text">Breakfast</h3>
            <h4 className="breakfast-text">{breakfast.name}</h4>
          </div>
        ) : (
          <div className="meal">
            <h3 className="breakfast-text">Breakfast</h3>
            <h4 className="breakfast-text">No value</h4>
          </div>
        )}

        {lunch ? (
          <div className="meal" key={lunch.key}>
            <h3 className="lunch-text">Lunch</h3>
            <h4 className="lunch-text">{lunch.name}</h4>
          </div>
        ) : (
          <div className="meal">
            <h3 className="lunch-text">Lunch</h3>
            <h4 className="lunch-text">No Value</h4>
          </div>
        )}

        {dinner ? (
          <div className="meal" key={dinner.key}>
            <h3 className="dinner-text">Dinner</h3>
            <h4 className="dinner-text">{dinner.name}</h4>
          </div>
        ) : (
          <div className="meal">
            <h3 className="dinner-text">Dinner</h3>
            <h4 className="dinner-text">No Value</h4>
          </div>
        )}
      </div>
      <div className="daily-totals">
        <p className="daily-totals-text carbs">Carbs: {totalCarbs}</p>
        <p className="daily-totals-text protein">Protein: {totalProtein}</p>
        <p className="daily-totals-text fat">Fat: {totalFat}</p>
        <p className="daily-totals-text cals">Calories: {totalCals}</p>
      </div>
    </div>
  );
}
