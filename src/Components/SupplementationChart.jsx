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

export default function SupplementationChart(props) {
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
        backgroundColor: "rgba(219, 188, 48, 0.75)",
      },
      {
        label: "Protein",
        data: [props.macros.protein.supplement / 7],
        backgroundColor: ["rgba(230, 53, 150, 0.75)"],
      },
      {
        label: "Fat",
        data: [props.macros.fat.supplement / 7],
        backgroundColor: ["rgba(222, 148, 64, 0.75)"],
      },
      {
        label: "Calories",
        data: [props.macros.cals.supplement / 7],
        backgroundColor: "rgba(201, 44, 63, 0.75)",
      },
    ],
  });
  return (
    <div className="panel">
      <div className="banner">
        <h1 className="banner-title">test</h1>
      </div>
      <div className="banner-body">
        <Bar
          data={supplementGraphData}
          options={options("Daily Supplementation")}
        />
      </div>
    </div>
  );
}
