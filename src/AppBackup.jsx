import { useState, useEffect } from "react";
import ScheduleColumn from "./components/ScheduleColumn";

function App() {
  const [plans, setPlans] = useState([]);
  const [titleValue, setTitleValue] = useState("");
  const [dayValue, setDayValue] = useState("");
  const [buttonActive, setButtonActive] = useState(false);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const dayOptionsEls = days.map((day) => {
    return (
      <option value={day} key={day}>
        {day}
      </option>
    );
  });

  const scheduleColumns = days.map((day) => {
    return (
      <ScheduleColumn
        key={day}
        day={day}
        plans={plans.filter((plan) => plan.day === day)}
        setPlans={setPlans}
      />
    );
  });

  function handleFormSubmit(e) {
    e.preventDefault();
    setPlans((prev) => {
      return [
        ...prev,
        { title: titleValue, day: dayValue, id: crypto.randomUUID() },
      ];
    });
    setTitleValue("");
    setDayValue("");
  }

  useEffect(() => {
    console.log("titleValue: ", titleValue, ". dayValue: ", dayValue, ".");
    if (
      titleValue.replaceAll(" ", "").length > 0 &&
      dayValue.replaceAll(" ", "").length > 0
    ) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [titleValue, dayValue]);

  return (
    <>
      <main className="planner">
        <h1>Planner</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Name your event..."
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            />
          </div>
          <div className="input-group">
            <select
              name="day"
              id="day"
              placeholder="Day"
              value={dayValue}
              onChange={(e) => setDayValue(e.target.value)}
            >
              <option value="" disabled hidden>
                Select a day...
              </option>
              {dayOptionsEls}
            </select>
          </div>
          {/* <div className="input-group">
            <input type="time" onChange={(e) => console.log(e)} />
          </div> */}
          <button className={buttonActive ? "active" : "inactive"}>Add</button>
        </form>
        <div className="schedule">{scheduleColumns}</div>
      </main>
    </>
  );
}

export default App;
