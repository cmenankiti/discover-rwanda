import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLearner } from "../context/LearnerContext";

export default function ModuleViewPage({
  moduleId,
  title,
  summary,
  badgeName,
  children,
}) {
  const { learner, completeModule, setLastVisitedRoute } = useLearner();
  const currentModule = learner.modules.find((m) => m.id === moduleId);

  useEffect(() => {
    if (currentModule?.route) {
      setLastVisitedRoute(currentModule.route);
    }
  }, [currentModule?.route, setLastVisitedRoute]);

  return (
    <main className="module-stage">
      <div className="container">
        <div className="module-top-nav">
          <Link to="/dashboard" className="btn-pill btn-pill-ghost btn-pill-sm">
            ← Back to Dashboard
          </Link>
          <span className="module-status-label">
            {currentModule?.completed ? "Completed" : "In Progress"}
          </span>
        </div>

        <section className="module-shell">
          <p className="module-kicker">/ ORIENTATION MODULE</p>
          <h1>{title}</h1>
          <p className="module-summary">{summary}</p>

          <div className="module-body-slot">{children}</div>

          <div className="module-complete-bar">
            <button
              type="button"
              onClick={() => completeModule(moduleId, 25, badgeName)}
              className="btn-pill btn-pill-yellow"
            >
              {currentModule?.completed
                ? "Module Completed (+25 pts)"
                : "Mark Module Complete (+25 pts)"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}