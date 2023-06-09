import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./Breakdown.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
let api;
if (import.meta.env.VITE_apiPort) {
  api =
    `${import.meta.env.VITE_apiURL}:${import.meta.env.VITE_apiPort}` ||
    "http://localhost:3500/";
} else {
  api = `${import.meta.env.VITE_apiURL}` || "http://localhost:3500/";
}
export default function Breakdown(props) {
  const options = (title) => {
    return {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: false,
          text: title,
        },
      },
    };
  };
  const [macroBreakdown, setMacroBreakdown] = useState(props.macros);
  const [supplementGraphData, setSupplementGraphData] = useState(false);
  useEffect(() => {
    const getGoals = async () => {
      let response = await fetch(`${api}/goals/${props.user.accountname}`);
      let data = await response.json();
      setMacroBreakdown((prev) => {
        return {
          ...prev,
          carbs: {
            goals: data[0].carb_goal,
            weeklyTotals: props.totals.carbs,
            deficit: data[0].carb_goal - props.totals.carbs,
            supplement: data[0].carb_goal - props.totals.carbs,
          },
          protein: {
            ...prev.protein,
            goals: data[0].protein_goal,
            weeklyTotals: props.totals.protein,
            deficit: data[0].protein_goal - props.totals.protein,
            supplement: data[0].protein_goal - props.totals.protein,
          },
          fat: {
            ...prev.fat,
            goals: data[0].fat_goal,
            weeklyTotals: props.totals.fat,
            deficit: data[0].fat_goal - props.totals.fat,
            supplement: data[0].fat_goal - props.totals.fat,
          },
          cals: {
            ...prev.cals,
            goals: data[0].cal_goal,
            weeklyTotals: props.totals.cals,
            deficit: data[0].cal_goal - props.totals.cals,
            supplement: data[0].cal_goal - props.totals.cals,
          },
        };
      });
    };
    getGoals();
  }, [props.totals, props.goalsUpdate]);
  useEffect(() => {
    props.handleMacros({
      ...macroBreakdown,
    });
    setSupplementGraphData({
      labels: ["daily"],
      datasets: [
        {
          label: "Carbs",
          data: [macroBreakdown.carbs.supplement / 7],
          backgroundColor: "rgba(219, 188, 48, 0.75)",
        },
        {
          label: "Protein",
          data: [macroBreakdown.protein.supplement / 7],
          backgroundColor: ["rgba(230, 53, 150, 0.75)"],
        },
        {
          label: "Fat",
          data: [macroBreakdown.fat.supplement / 7],
          backgroundColor: ["rgba(222, 148, 64, 0.75)"],
        },
        {
          label: "Calories",
          data: [macroBreakdown.cals.supplement / 7],
          backgroundColor: "rgba(201, 44, 63, 0.75)",
        },
      ],
    });
  }, [macroBreakdown, props.handleMacros, props.goalsUpdate]);
  return (
    <div className={styles["panel"]} id={styles["breakdown"]}>
      <div className={`${styles["breakdown-categories"]} ${styles["first"]}`}>
        <div className={`${styles["breakdown-banner"]} ${styles["first"]}`}>
          <h1 className={styles["banner-title"]}>Weekly Totals</h1>
        </div>
        <p>Carbs: {macroBreakdown.carbs.weeklyTotals}</p>
        <p>Protein: {macroBreakdown.protein.weeklyTotals}</p>
        <p>Fat: {macroBreakdown.fat.weeklyTotals}</p>
        <p>Cals: {macroBreakdown.cals.weeklyTotals}</p>
      </div>
      <div className={styles["breakdown-categories"]}>
        <div className={styles["breakdown-banner"]}>
          <h1 className={styles["banner-title"]}>Goals</h1>
        </div>
        <p>{macroBreakdown.carbs.goals}</p>
        <p>{macroBreakdown.protein.goals}</p>
        <p>{macroBreakdown.fat.goals}</p>
        <p>{macroBreakdown.cals.goals}</p>
      </div>
      <div className={styles["breakdown-categories"]}>
        <div className={styles["breakdown-banner"]}>
          <h1 className={styles["banner-title"]}>Supplement</h1>
        </div>
        <p>{macroBreakdown.carbs.supplement}</p>
        <p>{macroBreakdown.protein.supplement}</p>
        <p>{macroBreakdown.fat.supplement}</p>
        <p>{macroBreakdown.cals.supplement}</p>
      </div>
      <div className={`${styles["breakdown-categories"]} ${styles["last"]}`}>
        <div className={`${styles["breakdown-banner"]} ${styles["last"]}`}>
          <h1 className={styles["banner-title"]}> Chart</h1>
        </div>
        {supplementGraphData && (
          <div className={styles["chart-box-bottom"]}>
            <Bar
              data={supplementGraphData}
              options={options("Daily Supplementation")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
