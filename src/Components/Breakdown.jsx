import { useEffect, useState } from "react";

export default function Breakdown(props) {
  const [macroBreakdown, setMacroBreakdown] = useState({
    carbs: {
      weeklyTotals: 0,
      goals: 0,
      deficit: 0,
      supplement: 0,
    },
    protein: {
      weeklyTotals: 0,
      goals: 0,
      deficit: 0,
      supplement: 0,
    },
    fat: {
      weeklyTotals: 0,
      goals: 0,
      deficit: 0,
      supplement: 0,
    },
    cals: {
      weeklyTotals: 0,
      goals: 0,
      deficit: 0,
      supplement: 0,
    },
  });
  useEffect(() => {
    console.log(props.totals);
    setMacroBreakdown((prev) => {
      return {
        ...prev,
        carbs: { ...prev.carbs, weeklyTotals: props.totals.carbs },
        protein: { ...prev.protein, weeklyTotals: props.totals.protein },
        fat: { ...prev.fat, weeklyTotals: props.totals.fat },
        cals: { ...prev.cals, weeklyTotals: props.totals.cals },
      };
      //   console.log(prev);
      //   prev.carbs.weeklyTotals = props.totals.carbs;
      //   prev.protein.weeklyTotals = props.totals.protein;
      //   prev.fat.weeklyTotals = props.totals.fat;
      //   prev.cals.weeklyTotals = props.totals.cals;
      //   console.log(prev);
      //   return prev;
    });
    console.log(macroBreakdown);
  }, [props.totals]);
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
