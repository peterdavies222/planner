import ScheduleElement from "./ScheduleElement";
import { useRef, useEffect } from "react";

export default function ScheduleColumn(props) {
  const gridRef = useRef();
  useEffect(() => {
    const gridWidth = gridRef.current.getBoundingClientRect().width;
    gridRef.current.style.setProperty("--max-width", `${gridWidth}px`);
  }, []);

  let scheduleElements;
  if (props.plans) {
    const orderedPlans = props.plans.sort(
      (a, b) =>
        a.hour +
        (a.ampm === "pm" ? 12 : 0) +
        a.minute / 100 -
        (b.hour + (b.ampm === "pm" ? 12 : 0) + b.minute / 100),
    );
    scheduleElements = orderedPlans.map((plan) => {
      return (
        <ScheduleElement plan={plan} dispatch={props.dispatch} key={plan.id} />
      );
    });
  }
  return (
    <div className="schedule__column">
      <p className="schedule__column__title">{props.day}</p>
      <div className="schedule__column__grid" ref={gridRef}>
        {scheduleElements}
      </div>
    </div>
  );
}
