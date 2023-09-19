/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";

import AimoSchedule from "../../AimoSchedule/AimoSchedule";

const events = {
  "2023-09-01": [
    {
      title: "My Birthday!",
      desc: "This is my birthday. :)",
      color: "#f55e5e",
      bgColor: "#ffe8eb",
    },
    {
      title: "Laundry which is the worst thing to do!",
      desc: "",
      color: "green",
    },
  ],
  "2023-09-06": [
    {
      title: "Pink-Floyd Concert!",
      desc: "Best dat of my life! :)",
      color: "red",
    },
  ],
};

function DemoCalendar() {
  return (
    <div>
      <AimoSchedule events={events} targetDate={new Date()} />
    </div>
  );
}

export default DemoCalendar;
