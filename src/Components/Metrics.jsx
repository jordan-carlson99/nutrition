import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Metrics(props) {
  console.log(props.macros.carbs.supplement);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Supplementation",
      },
    },
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
  //   useEffect(() => {
  //     setSupplementGraphData((prev) => {
  //       return {
  //         ...prev,
  //         datasets: [],
  //       };
  //     });
  //   }, []);
  return (
    <div className="panel" id="metric-panel">
      <div className="banner">
        <h1 className="banner-title">Your metrics</h1>
      </div>
      <div className="top metrics">
        {/* bar graph which tracks how much user needs to supplement daily */}
        <Bar data={supplementGraphData} options={options} />;<p>pie chart</p>
      </div>
      <div className="bottom metrics">
        <p>double bar graph</p>
      </div>
    </div>
  );
}

// const BarChart = ({ chartData }) => {
//   return (
//     <div className="chart-container">
//       <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
//       <Bar
//         data={chartData}
//         options={{
//           plugins: {
//             title: {
//               display: true,
//               text: "Users Gained between 2016-2020",
//             },
//             legend: {
//               display: false,
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };
