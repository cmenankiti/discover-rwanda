import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLearner } from "../context/LearnerContext";
import ModuleCard from "../components/ModuleCard";

export default function DashboardPage() {
  const { learner, resetProgress, setLastVisitedRoute } = useLearner();

  useEffect(() => {
    setLastVisitedRoute("/dashboard");
  }, [setLastVisitedRoute]);

  const completedCount = learner.modules.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / learner.modules.length) * 100);

  return (
    <main className="dash-stage">
      <div className="container">
        <section className="dash-banner" aria-labelledby="dash-user-heading">
          <div className="dash-banner-info">
            <p className="dash-kicker">/ ORIENTATION DASHBOARD</p>
            <h1 id="dash-user-heading">Muraho, {learner.username}</h1>
            <p className="dash-goal">Goal: {learner.goal}</p>

            <div className="dash-progress-box">
              <div className="dash-progress-meta">
                <span>Completion Progress</span>
                <strong>{progressPercent}%</strong>
              </div>
              <div className="dash-progress-bar">
                <div
                  className="dash-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="dash-banner-actions">
            <Link
              to={
                learner.lastVisitedRoute && learner.lastVisitedRoute !== "/dashboard"
                  ? learner.lastVisitedRoute
                  : "/modules/welcome"
              }
              className="btn-pill btn-pill-yellow"
            >
              Continue Learning
            </Link>
            <button
              type="button"
              onClick={resetProgress}
              className="btn-pill btn-pill-ghost"
            >
              Reset Progress
            </button>
          </div>
        </section>

        <section className="dash-metrics" aria-label="Learner summary metrics">
          <div className="dash-metric-card">
            <span className="metric-label">Completed Modules</span>
            <strong className="metric-value">
              {completedCount} <span>/ {learner.modules.length}</span>
            </strong>
          </div>

          <div className="dash-metric-card">
            <span className="metric-label">Points</span>
            <strong className="metric-value">{learner.points}</strong>
          </div>

          <div className="dash-metric-card">
            <span className="metric-label">Badges</span>
            <div className="metric-badges">
              {learner.badges.length > 0 ? (
                learner.badges.map((badge) => (
                  <span key={badge} className="flag-badge">
                    {badge}
                  </span>
                ))
              ) : (
                <span className="metric-empty">No badges yet</span>
              )}
            </div>
          </div>
        </section>

        <section aria-labelledby="dash-modules-heading">
          <div className="dash-section-head">
            <h2 id="dash-modules-heading">Orientation Modules</h2>
          </div>

          <div className="dash-modules-grid">
            {learner.modules.map((mod, idx) => (
              <ModuleCard key={mod.id} module={mod} index={idx} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}