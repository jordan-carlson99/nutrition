import { useEffect, useState } from "react";

const api =
  `http://${import.meta.env.VITE_apiURL}:${import.meta.env.VITE_apiPort}` ||
  "http://localhost:3500/";

export default function Schedule(props) {
  const [mealPlan, setMealPlan] = useState(null);
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
      setMealPlan(days);
    }
    getSchedule();
    console.log(mealPlan);
  }, []);
  return (
    <div className="panel" id="schedule">
      {mealPlan.map((day) => {
        return <WeekDay data={day} />;
      })}
      {/* add in "day" components */}
    </div>
  );
}

function WeekDay(props) {
  return (
    <div className="week-day">
      <div className="banner">
        <h1 className="banner-title">{props.data[0].meal_day}</h1>
      </div>
      <div className="breakfast">
        <h3 className="breakfast-text">Breakfast</h3>
        <h4 className="breakfast-text">{props.data[0].name}</h4>
      </div>
      <div className="lunch">
        <h3 className="lunch-text">lunch</h3>
        <h4 className="lunch-text">
          {props.data[1].name ? props.data[1].name : none}
        </h4>
      </div>
    </div>
  );
}
