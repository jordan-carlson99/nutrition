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
      <div id="sign-in-panel">
        <h3 id="welcome-message">Welcome {userName}</h3>
        {/* <p></p> */}
      </div>
      <div id="title">Nutrition App</div>
    </header>
  );
}

function App() {
  const [user, setUser] = useState({ accountname: "user1", id: 2 });
  const [totalsSet, setTotalsSet] = useState(false);
  const totals = useRef({
    carbs: 0,
    protein: 0,
    fat: 0,
    cals: 0,
  });
  const [macrosSet, setMacrosSet] = useState(false);
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
          <UserPanel user={user} />
          {totalsSet && macrosSet && (
            <Metrics user={user} macros={macroBreakdown.current} />
          )}
        </div>
        <div id="right-side">
          <Schedule user={user} handleTotals={handleTotals} />
          {totalsSet && (
            <Breakdown
              totals={totals.current}
              user={user}
              macros={macroBreakdown.current}
              handleMacros={handleMacros}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
