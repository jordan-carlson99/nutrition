import { useRef, useState } from "react";
import UserPanel from "./Components/UserPanel";
import Schedule from "./Components/Schedule";
import Breakdown from "./Components/Breakdown";
import Metrics from "./Components/Metrics";
import "./App.css";

let userName = "username";

function TitleBar() {
  return (
    <header>
      {/* <div id="sign-in-panel">
        <h3 id="welcome-message">Welcome {userName}</h3>
        <p></p>
      </div> */}
      <div id="title">
        <h1>Idunns Orchard</h1>
      </div>
    </header>
  );
}

function App() {
  const [user, setUser] = useState({ accountname: "user1", id: 2 });
  const [totalsSet, setTotalsSet] = useState(false);
  const [macrosSet, setMacrosSet] = useState(false);
  const totals = useRef({
    carbs: 0,
    protein: 0,
    fat: 0,
    cals: 0,
  });
  const macroBreakdown = useRef({
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
  const [goalsUpdate, setGoalsUpdate] = useState(false);
  const handleGoalsUpdate = () => {
    setGoalsUpdate(!goalsUpdate);
  };
  const handleTotals = (newTotals) => {
    totals.current = newTotals;
    setTotalsSet(true);
  };
  const handleMacros = (newMacros) => {
    macroBreakdown.current = { ...newMacros };
    if (macroBreakdown.current.carbs.weeklyTotals != 0) {
      setMacrosSet(true);
    }
  };
  return (
    <>
      <TitleBar />
      <div id="panels">
        <div id="left-side">
          <UserPanel user={user} handleGoalsUpdate={handleGoalsUpdate} />
          {totalsSet && macrosSet && (
            <Metrics user={user} macros={macroBreakdown.current} />
          )}
        </div>
        <div id="right-side">
          <Schedule user={user} handleTotals={handleTotals} />
          <div id="bottom-panels">
            {totalsSet && (
              <Breakdown
                totals={totals.current}
                user={user}
                macros={macroBreakdown.current}
                handleMacros={handleMacros}
                goalsUpdate={goalsUpdate}
              />
            )}
            {/* {macrosSet && (
              <SupplementationChart macros={macroBreakdown.current} />
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
