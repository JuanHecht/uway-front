import React from "react";
import { Link } from "react-router-dom";

function DailyLogCard({ dailyLog }) {
  return (
    <div key={dailyLog._id}>
      <h3>Mood: {dailyLog.mood}</h3>
      <p>Notes: {dailyLog.notes}</p>
      <Link to={`/dailylogedit/${dailyLog._id}`}>
        <button>Edit log</button>
      </Link>
    </div>
  );
}

export default DailyLogCard;