import { useRef, useState } from "react";
import UserPanel from "./Components/UserPanel";
import Schedule from "./Components/Schedule";
import Breakdown from "./Components/Breakdown";
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

function Metrics() {
  return (
    <div className="panel" id="metric-panel">
      <div className="banner">
        <h1 className="banner-title">Your metrics</h1>
      </div>
      <div className="top metrics">
        <p>bar graph</p>
        <p>pie chart</p>
      </div>
      <div className="bottom metrics">
        <p>double bar graph</p>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState({ accountname: "user1", id: 2 });
  const totals = useRef({
    carbs: 0,
    protein: 0,
    fat: 0,
    cals: 0,
  });
  const [totalsSet, setTotalsSet] = useState(false);
  const handleTotals = (newTotals) => {
    totals.current = newTotals;
    setTotalsSet(true);
  };
  return (
    <>
      <TitleBar />
      <div id="left-side">
        <UserPanel user={user} />
        <Metrics />
      </div>
      <div id="right-side">
        <Schedule user={user} handleTotals={handleTotals} />
        {totalsSet && <Breakdown totals={totals.current} />}
      </div>
    </>
  );
}

export default App;
