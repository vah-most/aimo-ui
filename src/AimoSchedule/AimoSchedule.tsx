/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";
import moment from "moment";

import "./AimoSchedule.css";

interface IDayOfWeek {
  title: string;
  abbr: string;
}

interface ICalendarEvent {
  title: string;
  desc?: string;
  color?: string;
  bgColor?: string;
}
interface ICalendarEvents {
  [key: string]: ICalendarEvent[];
}
interface ICalendarItem {
  date: moment.Moment | null;
}

export interface IAimoScheduleProps {
  events: ICalendarEvents;
  targetDate?: Date;
  firstDayOfWeek?: string;
}
function AimoSchedule({
  events,
  targetDate = new Date(),
  firstDayOfWeek = "Monday",
}: IAimoScheduleProps) {
  const getDaysOfWeek = (): IDayOfWeek[] => {
    const defaultDaysOfWeek: IDayOfWeek[] = [
      {
        title: "Monday",
        abbr: "Mon",
      },
      {
        title: "Tuesday",
        abbr: "Tue",
      },
      {
        title: "Wednesday",
        abbr: "Wed",
      },
      {
        title: "Thursday",
        abbr: "Thu",
      },
      {
        title: "Friday",
        abbr: "Fri",
      },
      {
        title: "Saturday",
        abbr: "Sat",
      },
      {
        title: "Sunday",
        abbr: "Sun",
      },
    ];

    let currDowIndex = 0;
    firstDayOfWeek = firstDayOfWeek.toLocaleLowerCase();
    for (let cdow of defaultDaysOfWeek) {
      if (
        cdow.title.toLocaleLowerCase() === firstDayOfWeek ||
        cdow.abbr.toLocaleLowerCase() === firstDayOfWeek
      )
        break;
      currDowIndex++;
    }
    const currDaysOfWeek = [
      ...defaultDaysOfWeek.slice(currDowIndex, 7),
      ...defaultDaysOfWeek.slice(0, currDowIndex),
    ];

    return currDaysOfWeek;
  };

  const getCalendarItems = (): ICalendarItem[] => {
    const fdom = moment(targetDate).startOf("month");
    const fdow = moment(fdom).format("dddd").toLocaleLowerCase();
    let fdowIndex = 0;
    for (let dow of daysOfWeek) {
      if (dow.title.toLocaleLowerCase() === fdow) break;
      fdowIndex++;
    }
    const calendarDayCount = 35;
    let calendarItems: ICalendarItem[] = [];
    Array.from(new Array(calendarDayCount).keys()).forEach((ci, index) => {
      if (index < fdowIndex) calendarItems.push({ date: null });
      else
        calendarItems.push({
          date: moment(fdom).add(index - fdowIndex, "days"),
        });
    });

    return calendarItems;
  };

  const daysOfWeek = getDaysOfWeek();
  const calendarItems = getCalendarItems();

  const renderCalendarItem = (ci: ICalendarItem): React.ReactElement | null => {
    if (!ci.date) return null;

    const dateStr = moment(ci.date).format("YYYY-MM-DD");
    const dateEvents: ICalendarEvent[] | null =
      dateStr in events ? events[dateStr] : null;
    if (!dateEvents) return null;
    return (
      <React.Fragment>
        {dateEvents.map((de, index) => {
          let style = {};
          if (de.color) {
            style["color"] = de.color;
            style["borderColor"] = de.color;
          }
          if (de.bgColor) style["backgroundColor"] = de.bgColor;
          const targetId = `sc-ci-${dateStr}-${index}`;
          return (
            <div
              key={`sc-ci-${dateStr}-${index}`}
              className={`scCalendarEvent`}
              id={targetId}
              style={style}
            >
              {de.title}
            </div>
          );
        })}
      </React.Fragment>
    );
  };
  return (
    <div className="scCalendarContainer">
      {daysOfWeek.map((dow, index) => {
        return (
          <div key={index} className="scCalendarDoWTitle">
            {dow.title}
          </div>
        );
      })}
      {calendarItems.map((ci, index) => {
        const isToday =
          ci.date &&
          ci.date.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD");

        return (
          <div
            key={`ci-${index}`}
            className={`scCalendarDoW ${isToday ? "scCalendarDowToday" : ""}`}
          >
            <div className="scCalendarItemEvents">{renderCalendarItem(ci)}</div>
            <div className="scCalendarItemDate">{ci.date?.format("MM-DD")}</div>
          </div>
        );
      })}
    </div>
  );
}

export default AimoSchedule;
