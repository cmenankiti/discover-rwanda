import { Link } from "react-router-dom";

const ACCENT_CLASSES = [
  "card--blue",
  "card--yellow",
  "card--green",
  "card--blue",
  "card--yellow",
];

export default function ModuleCard({ module, index }) {
  return (
    <article
      className={`dash-module-card ${ACCENT_CLASSES[index % ACCENT_CLASSES.length]}`}
    >
      <div className="dash-module-top">
        <span className="dash-module-index">0{index + 1}</span>
        <span
          className={`dash-status-pill ${module.completed ? "is-complete" : "is-open"}`}
        >
          {module.completed ? "Completed" : "Open"}
        </span>
      </div>

      <h3>{module.title}</h3>
      <p>{module.description}</p>

      <div className="dash-module-footer">
        <span className="dash-points">+{module.pointsEarned} pts</span>
        <Link to={module.route} className="btn-pill btn-pill-ghost btn-pill-sm">
          {module.completed ? "Review" : "Open Module"}
        </Link>
      </div>
    </article>
  );
}