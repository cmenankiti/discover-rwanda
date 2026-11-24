import { useState } from "react";
import { Link } from "react-router-dom";
import { useLearner } from "../context/LearnerContext";
import FlagEmblem from "../components/FlagEmblem";

export default function LandingPage() {
  const { learner } = useLearner();
  const [orbTick, setOrbTick] = useState(0);

return (
    <main className="landing-stage">
      <div className="ambient-glow ambient-glow--blue" aria-hidden="true" />
      <div className="ambient-glow ambient-glow--green" aria-hidden="true" />

      <div className="container landing-inner">
        <div className="hero-orb-row">
          <button
            type="button"
            className="orb-cycle-btn"
            onClick={() => setOrbTick((prev) => prev + 1)}
            title="Cycle flag palette"
          >
            <FlagEmblem
              variant="hero"
              activeIndex={orbTick}
              tiltDeg={orbTick * 18 - 8}
            />
          </button>
          <Link
            to={learner.isAuthenticated ? "/dashboard" : "/login"}
            className="floating-action-badge"
          >
            {learner.isAuthenticated ? "Dashboard" : "Start here"}
          </Link>
        </div>

        <p className="landing-kicker">/ RWANDA STUDENT ORIENTATION</p>

        <h1 className="landing-headline">
          A new way to
          <br />
          experience <span className="headline-highlight">Rwanda</span>
          <span className="headline-star">*</span>.
        </h1>

        <p className="landing-subcopy">
          Build confidence in Kigali and across campus through Kinyarwanda
          greetings, everyday social etiquette, and interactive student-life
          scenarios.
        </p>

        <div className="landing-actions">
          <Link
            to={learner.isAuthenticated ? "/dashboard" : "/login"}
            className="btn-pill btn-pill-yellow btn-pill-lg"
          >
            {learner.isAuthenticated ? "Continue Orientation" : "Create Account"}
          </Link>
          <Link to="/login" className="btn-pill btn-pill-ghost btn-pill-lg">
            Log In
          </Link>
        </div>

        <section className="landing-pillars" aria-label="Key orientation pillars">
          <article className="pillar-card pillar-card--blue">
            <span className="pillar-tag">01 / Language</span>
            <h2>Kinyarwanda Starter</h2>
            <p>Essential everyday greetings, polite phrases, and pronunciation guides.</p>
          </article>

          <article className="pillar-card pillar-card--yellow">
            <span className="pillar-tag">02 / Culture</span>
            <h2>Etiquette & Daily Life</h2>
            <p>Practical social norms, community values, and student-life context.</p>
          </article>

          <article className="pillar-card pillar-card--green">
            <span className="pillar-tag">03 / Practice</span>
            <h2>Scenarios & Quizzes</h2>
            <p>Decision-based campus scenarios with feedback, points, and badges.</p>
          </article>
        </section>
      </div>
    </main>
  );
}