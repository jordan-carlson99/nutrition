import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Pie, PolarArea } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const api =
  `http://${import.meta.env.VITE_apiURL}:${import.meta.env.VITE_apiPort}` ||
  "http://localhost:3500/";

export default function Metrics(props) {
  const options = (title) => {
    return {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: title,
        },
      },
    };
  };

  //   labels: ["daily"],
  //   datasets: [
  //     {
  //       label: "Carbs",
  //       data: [props.macros.carbs.supplement / 7],
  //       backgroundColor: "rgba(219, 188, 48, 0.75)",
  //     },
  //     {
  //       label: "Protein",
  //       data: [props.macros.protein.supplement / 7],
  //       backgroundColor: ["rgba(230, 53, 150, 0.75)"],
  //     },
  //     {
  //       label: "Fat",
  //       data: [props.macros.fat.supplement / 7],
  //       backgroundColor: ["rgba(222, 148, 64, 0.75)"],
  //     },
  //     {
  //       label: "Calories",
  //       data: [props.macros.cals.supplement / 7],
  //       backgroundColor: "rgba(201, 44, 63, 0.75)",
  //     },
  //   ],
  // });
  const [diversityGraphData, setDiversityGraphData] = useState({
    labels: ["Carbs", "Proteins", "Fats"],
    datasets: [
      {
        label: "Carbs",
        data: [
          props.macros.carbs.weeklyTotals,
          props.macros.protein.weeklyTotals,
          props.macros.fat.weeklyTotals,
        ],
        backgroundColor: [
          "rgba(219, 188, 48, 0.75)",
          "rgba(230, 53, 150, 0.75)",
          "rgba(222, 148, 64, 0.75)",
        ],
      },
    ],
  });
  const [polarGraphData, setPolarGraphData] = useState({
    labels: [],
    datasets: [
      {
        label: "Calorie Sources",
        data: [],
        backgroundColor: [
          "rgba(219, 188, 48, 0.75)",
          "rgba(230, 53, 150, 0.75)",
          "rgba(222, 148, 64, 0.75)",
          "rgba(201, 44, 63, 0.75)",
        ],
      },
    ],
  });

  useEffect(() => {
    console.log("metrics");
    const getMeals = async () => {
      let response = await fetch(`${api}/meals/${props.user.accountname}`);
      let data = await response.json();
      let dataSet = Object.values(
        data.reduce((acc, meal) => {
          if (!acc[meal.name]) {
            acc[meal.name] = { ...meal };
          }
          return acc;
        }, {})
      );
      const updatedData = dataSet.map((meal) => ({
        name: meal.name,
        calories: meal.meal_calories,
      }));
      setPolarGraphData((prev) => ({
        ...prev,
        labels: updatedData.map((meal) => meal.name),
        datasets: [
          {
            ...prev.datasets[0],
            data: updatedData.map((meal) => meal.calories),
          },
        ],
      }));
    };
    getMeals();
  }, []);

  return (
    <div className="panel" id="metric-panel">
      <div className="banner">
        <h1 className="banner-title">Your metrics</h1>
      </div>
      <div id="top-metrics">
        <div className="chart-box-top">
          <PolarArea
            options={options("Caloric Sources")}
            data={polarGraphData}
          ></PolarArea>
        </div>
      </div>
      <div id="bottom-metrics">
        <div className="chart-box-bottom">
          <Pie
            options={options("Macronutrient Ratios")}
            data={diversityGraphData}
          ></Pie>
        </div>
      </div>
    </div>
  );
}
