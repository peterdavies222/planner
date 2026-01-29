import ScheduleElement from "./ScheduleElement";

export default function ScheduleColumn(props) {
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
      <div className="schedule__column__grid">{scheduleElements}</div>
    </div>
  );
}
