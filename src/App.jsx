import { useState } from "react";
import UserPanel from "./Components/UserPanel";
import Schedule from "./Components/Schedule";
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

function Breakdown() {
  return (
    <div className="panel" id="breakdown">
      <div className="banner">
        <div className="breakdown-categories">Weekly Totals</div>
        <div className="breakdown-categories">Goals</div>
        <div className="breakdown-categories">Deficit/Surplus</div>
        <div className="breakdown-categories">Supplemental Requirements</div>
      </div>
      <div>{/* add in some div containers that have cpfc */}</div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState({ accountname: "user1", id: 2 });
  return (
    <>
      <TitleBar />
      <div id="left-side">
        <UserPanel user={user} />
        <Metrics />
      </div>
      <div id="right-side">
        <Schedule user={user} />
        <Breakdown />
      </div>
    </>
  );
}

export default App;
