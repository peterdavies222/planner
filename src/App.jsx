import { useState, useEffect, useReducer } from "react";
import ScheduleColumn from "./components/ScheduleColumn";
import { TYPES } from "./actionTypes";

function reducer(state, payload) {
  switch (payload.type) {
    case TYPES.NEW_TASK:
      return { ...state, plans: [...state.plans, payload.plan] };
    case TYPES.REMOVE_PLAN:
      return {
        ...state,
        plans: state.plans.filter((plan) => plan.id != payload.id),
      };
    case TYPES.EDIT_PLAN:
      return {
        ...state,
        plans: state.plans.map((plan) => {
          if (plan.id != payload.plan.id) {
            return plan;
          } else {
            return payload.plan;
          }
        }),
      };
    default:
      console.log("Invalid action type");
      return state;
  }
}

function App() {
  // const [plans, setPlans] = useState([]);
  const [state, dispatch] = useReducer(reducer, { plans: [] });
  const [titleValue, setTitleValue] = useState("Plan");
  const [dayValue, setDayValue] = useState("Monday");
  const [hourValue, setHourValue] = useState("5");
  const [minuteValue, setMinuteValue] = useState("25");
  const [amPmValue, setAmPmValue] = useState("am");
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

  const hours = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const hoursOptionsEls = hours.map((hour) => {
    return (
      <option value={hour} key={hour}>
        {hour.padStart(2, "0")}
      </option>
    );
  });
  const minutes = Array.from({ length: 12 }, (_, i) => `${5 * i}`);
  const minutesOptionsEls = minutes.map((minute) => {
    return (
      <option value={minute} key={minute}>
        {minute.padStart(2, "0")}
      </option>
    );
  });

  const scheduleColumns = days.map((day) => {
    return (
      <ScheduleColumn
        key={day}
        day={day}
        plans={state.plans.filter((plan) => plan.day === day)}
        dispatch={dispatch}
      />
    );
  });

  function handleFormSubmit(e) {
    e.preventDefault();
    dispatch({
      type: TYPES.NEW_TASK,
      plan: {
        title: titleValue,
        day: dayValue,
        hour: hourValue,
        minute: minuteValue,
        ampm: amPmValue,
        id: crypto.randomUUID(),
      },
    });
    setTitleValue("");
    setDayValue("");
    setHourValue("");
    setMinuteValue("");
  }

  useEffect(() => {
    if (
      titleValue.replaceAll(" ", "").length > 0 &&
      dayValue.replaceAll(" ", "").length > 0 &&
      hourValue &&
      minuteValue
    ) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [titleValue, dayValue, hourValue, minuteValue]);

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
          <div className="input-family">
            {/* <div className="input-group"> */}
            <select
              name="day"
              id="day"
              placeholder="Day"
              value={dayValue}
              onChange={(e) => setDayValue(e.target.value)}
            >
              <option value="" disabled>
                Day
              </option>
              {dayOptionsEls}
            </select>
            <div className="vr"></div>
            {/* </div> */}
            {/* <div className="input-group"> */}
            <select
              name="hour"
              id="hour"
              placeholder="hour"
              value={hourValue}
              onChange={(e) => setHourValue(e.target.value)}
            >
              <option value="" disabled>
                Hour
              </option>
              {hoursOptionsEls}
            </select>
            <div className="vr"></div>

            {/* </div> */}
            {/* <div className="input-group"> */}
            <select
              name="minute"
              id="minute"
              placeholder="minute"
              value={minuteValue}
              onChange={(e) => setMinuteValue(e.target.value)}
            >
              <option value="" disabled>
                Minute
              </option>
              {minutesOptionsEls}
            </select>
            <div className="vr"></div>
            {/* </div> */}
            <select
              name="ampm"
              id="ampm"
              value={amPmValue}
              onChange={(e) => setAmPmValue(e.target.value)}
            >
              <option value="am">AM</option>
              <option value="pm">PM</option>
            </select>
          </div>
          <button className={buttonActive ? "active" : "inactive"}>Add</button>
        </form>
        <div className="schedule">{scheduleColumns}</div>
      </main>
    </>
  );
}

export default App;
