import { useEffect, useState } from "react";

const api =
  `http://${import.meta.env.VITE_apiURL}:${import.meta.env.VITE_apiPort}` ||
  "http://localhost:3500/";

export default function Schedule(props) {
  useEffect(() => {
    async function getSchedule() {
      let response = await fetch(`${api}/meals/${props.user.accountname}`);
    }
    getSchedule();
  });
  return (
    <div className="panel" id="schedule">
      {/* add in "day" components */}
    </div>
  );
}

function WeekDay(props) {
  return (
    <div className="week-day">
      <div className="banner">
        <h1 className="banner-title"></h1>
      </div>
      <div className="Brea"></div>
    </div>
  );
}
