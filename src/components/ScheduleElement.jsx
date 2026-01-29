import { TYPES } from "../actionTypes";
import { useState } from "react";

export default function ScheduleElement({ plan, dispatch }) {
  const [editing, setEditing] = useState(false);
  const [hourValue, setHourValue] = useState(plan.hour);
  const [minuteValue, setMintueValue] = useState(plan.minute);
  const [amPmValue, setAmPmValue] = useState(plan.ampm);
  const [titleValue, setTitleValue] = useState(plan.title);

  function saveData() {
    dispatch({
      type: TYPES.EDIT_PLAN,
      plan: {
        title: titleValue,
        day: plan.day,
        hour: hourValue,
        minute: minuteValue,
        ampm: amPmValue,
        id: plan.id,
      },
    });
    setEditing(false);
  }

  function removeElement() {
    dispatch({ type: TYPES.REMOVE_PLAN, id: plan.id });
  }

  const hours = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const hourEls = hours.map((hour) => {
    return (
      <option key={hour} value={hour}>
        {hour}
      </option>
    );
  });

  const minutes = Array.from({ length: 12 }, (_, i) => `${i * 5}`);
  const minutesEls = minutes.map((minute) => {
    return (
      <option key={minute} value={minute}>
        {minute.padStart(2, "0")}
      </option>
    );
  });

  return (
    <article className="schedule__element">
      {!editing ? (
        <>
          <div>
            <p className="schedule__element__time">
              {plan.hour}:{plan.minute.padStart(2, "0")}
              {plan.ampm.toUpperCase()}
            </p>
            <p className="schedule__element__title">{plan.title}</p>
          </div>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      ) : (
        <>
          <div>
            <div className="time-edit">
              <select
                name="hour"
                id="hour"
                value={hourValue}
                onChange={(e) => setHourValue(e.target.value)}
              >
                {hourEls}
              </select>
              <select
                name="minute"
                id="minute"
                value={minuteValue}
                onChange={(e) => setMintueValue(e.target.value)}
              >
                {minutesEls}
              </select>
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
            <input
              type="text"
              id="title"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            />
          </div>
          <div className="buttons">
            <button className="delete" onClick={removeElement}>
              Delete
            </button>
            <button className="save" onClick={saveData}>
              Save
            </button>
          </div>
        </>
      )}
    </article>
  );
}
