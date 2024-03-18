import React, { useEffect, useState } from "react";
import CalendarDays from "./CalendarDays";
import "./Calendar.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import axios from "axios";

export default function Calendar() {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January ",
    "February ",
    "March ",
    "April ",
    "May ",
    "June ",
    "July ",
    "August ",
    "September ",
    "October ",
    "November ",
    "December ",
  ];

  const [currentDay, setCurrentDay] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const userId = "65e6328a68059ab797224e0f";

  function changeCurrentDay(day) {
    console.log(day);
    setCurrentDay(new Date(day.year, day.month, day.number));
  }

  function nextMonth() {
    //const { currentDay } = this.state;
    const nextMonth = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth() + 1,
      1
    );
    setCurrentDay(nextMonth);
  }

  function prevMonth() {
    // const { currentDay } = this.state;
    const prevMonth = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth() - 1,
      1
    );
    setCurrentDay(prevMonth);
  }

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) console.log(result);
      setTasks(result);
    });
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchAll() {
    console.log("in fetchall");
    try {
      const response = await axios.get(
        "http://localhost:8000/tasks/65e6328a68059ab797224e0f"
      );
      return response.data.users;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return [];
    }
  }
  return (
    <div className="calendar font-outfit">
      <div className="fixed z-0 flex flex-wrap bg-white w-screen min-h-screen"></div>
      <Navbar className="z-0" />
      <Sidebar />
      <div className="calendar-container mt-32 z-20">
        <div className="calendar-header text-2xl font-bold text-teal-950">
          <button className="text-left" onClick={prevMonth}>
            ←{" "}
          </button>
          <h2 className="text-center text-2xl font-bold text-slate-200">
            {months[currentDay.getMonth()]}
            {currentDay.getFullYear()}
          </h2>
          <button className="text-right" onClick={nextMonth}>
            {" "}
            →
          </button>
        </div>

        <div className="calendar-body border-2 mb-32">
          <div className="table-header border-2">
            {weekdays.map((weekday) => {
              return (
                <div className="weekday">
                  <p className="mb-0">{weekday}</p>
                </div>
              );
            })}
          </div>
          {
            <CalendarDays
              day={currentDay}
              changeCurrentDay={changeCurrentDay}
              tasks={tasks}
            />
          }
        </div>
      </div>
    </div>
  );
}
