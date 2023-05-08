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

  const [supplementGraphData, setSupplementGraphData] = useState({
    labels: ["daily"],
    datasets: [
      {
        label: "Carbs",
        data: [props.macros.carbs.supplement / 7],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Protein",
        data: [props.macros.protein.supplement / 7],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Fat",
        data: [props.macros.fat.supplement / 7],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Calories",
        data: [props.macros.cals.supplement / 7],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });
  const [diversityGraphData, setDiversityGraphData] = useState({
    labels: ["Carbs", "Proteins", "Fats"],
    datasets: [
      {
        label: "Carbs",
        data: [
          props.macros.carbs.supplement,
          props.macros.protein.supplement,
          props.macros.fat.supplement,
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.5)"],
      },
    ],
  });
  const [polarGraphData, setPolarGraphData] = useState({
    labels: [],
    datasets: [
      {
        label: "Calorie Sources",
        data: [],
        backgroundColor: ["rgba(255, 99, 132, 0.5)"],
      },
    ],
  });

  useEffect(() => {
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
        <div className="chart-box">
          <PolarArea
            options={options("Caloric Sources")}
            data={polarGraphData}
          ></PolarArea>
        </div>
        <div className="chart-box">
          <Pie
            options={options("Macronutrient Ratios")}
            data={diversityGraphData}
          ></Pie>
        </div>
      </div>
      <div id="bottom-metrics">
        <div className="chart-box">
          <Bar
            data={supplementGraphData}
            options={options("Daily Supplementation")}
          />
        </div>
      </div>
    </div>
  );
}
