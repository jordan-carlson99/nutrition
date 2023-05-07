import { useEffect, useState } from "react";

const api =
  `http://${import.meta.env.VITE_apiURL}:${import.meta.env.VITE_apiPort}` ||
  "http://localhost:3500/";

export default function Breakdown(props) {
  // const [macroBreakdown, setMacroBreakdown] = useState({
  //   carbs: {
  //     weeklyTotals: 0,
  //     goals: 0,
  //     deficit: 0,
  //     supplement: 0,
  //   },
  //   protein: {
  //     weeklyTotals: 0,
  //     goals: 0,
  //     deficit: 0,
  //     supplement: 0,
  //   },
  //   fat: {
  //     weeklyTotals: 0,
  //     goals: 0,
  //     deficit: 0,
  //     supplement: 0,
  //   },
  //   cals: {
  //     weeklyTotals: 0,
  //     goals: 0,
  //     deficit: 0,
  //     supplement: 0,
  //   },
  // });
  const [macroBreakdown, setMacroBreakdown] = useState(props.macros);
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
            supplement:
              data[0].carb_goal - props.totals.carbs < 0
                ? 0
                : data[0].carb_goal - props.totals.carbs,
          },
          protein: {
            ...prev.protein,
            goals: data[0].protein_goal,
            weeklyTotals: props.totals.protein,
            deficit: data[0].protein_goal - props.totals.protein,
            supplement:
              data[0].protein_goal - props.totals.protein < 0
                ? 0
                : data[0].protein_goal - props.totals.protein,
          },
          fat: {
            ...prev.fat,
            goals: data[0].fat_goal,
            weeklyTotals: props.totals.fat,
            deficit: data[0].fat_goal - props.totals.fat,
            supplement:
              data[0].fat_goal - props.totals.fat < 0
                ? 0
                : data[0].fat_goal - props.totals.fat,
          },
          cals: {
            ...prev.cals,
            goals: data[0].cal_goal,
            weeklyTotals: props.totals.cals,
            deficit: data[0].cal_goal - props.totals.cals,
            supplement:
              data[0].cal_goal - props.totals.cals < 0
                ? 0
                : data[0].cal_goal - props.totals.cals,
          },
        };
      });
    };
    getGoals();
  }, [props.totals]);
  useEffect(() => {
    props.handleMacros({
      ...macroBreakdown,
    });
  }, [macroBreakdown, props.handleMacros]);
  return (
    <div className="panel" id="breakdown">
      <div className="banner">
        <div className="breakdown-categories">
          <h1>Weekly Totals</h1>
          <p className="carbs">{macroBreakdown.carbs.weeklyTotals}</p>
          <p className="protein">{macroBreakdown.protein.weeklyTotals}</p>
          <p className="fat">{macroBreakdown.fat.weeklyTotals}</p>
          <p className="cals">{macroBreakdown.cals.weeklyTotals}</p>
        </div>
        <div className="breakdown-categories">
          <h1>Goals</h1>
          <p className="carbs">{macroBreakdown.carbs.goals}</p>
          <p className="protein">{macroBreakdown.protein.goals}</p>
          <p className="fat">{macroBreakdown.fat.goals}</p>
          <p className="cals">{macroBreakdown.cals.goals}</p>
        </div>
        <div className="breakdown-categories">
          <h1>Deficit</h1>
          <p className="carbs">{macroBreakdown.carbs.deficit}</p>
          <p className="protein">{macroBreakdown.protein.deficit}</p>
          <p className="fat">{macroBreakdown.fat.deficit}</p>
          <p className="cals">{macroBreakdown.cals.deficit}</p>
        </div>
        <div className="breakdown-categories">
          <h1>Supplement</h1>
          <p className="carbs">{macroBreakdown.carbs.supplement}</p>
          <p className="protein">{macroBreakdown.protein.supplement}</p>
          <p className="fat">{macroBreakdown.fat.supplement}</p>
          <p className="cals">{macroBreakdown.cals.supplement}</p>
        </div>
      </div>
      <div>{/* add in some div containers that have cpfc */}</div>
    </div>
  );
}
