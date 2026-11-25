import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLearner } from "../context/LearnerContext";
import QuickTranslator from "../components/QuickTranslator";
import {
  getFilteredFallbackVoices,
  pickDefaultFallbackVoice,
  speakKinyarwandaPhrase,
} from "../shared/audio/speechService";
import {
  MODULE_REWARDS,
  WELCOME_SECTIONS,
  KINYARWANDA_PHRASES,
  CULTURE_CARDS,
  HISTORY_TIMELINE,
  SCENARIO_QUIZZES,
} from "../data/orientationData";
import "../styles/modules.css";

export default function ModuleViewPage() {
  const { moduleId } = useParams();
  const { learner, setLastVisitedRoute, completeModule } = useLearner();

  const [phraseCategory, setPhraseCategory] = useState("All");
  const [practicedIds, setPracticedIds] = useState([]);
  const [historyUnlocked, setHistoryUnlocked] = useState(false);
  const [answers, setAnswers] = useState({});
  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const mod = learner.modules.find((m) => m.id === moduleId);
  const reward = MODULE_REWARDS[moduleId] || {
    points: 25,
    badge: "Orientation Learner",
  };

  useEffect(() => {
    if (mod) {
      setLastVisitedRoute(mod.route);
    }
    setPhraseCategory("All");
    setHistoryUnlocked(false);
  }, [moduleId]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const loadVoices = () => {
      const filteredVoices = getFilteredFallbackVoices();
      setVoices(filteredVoices);

      if (filteredVoices.length > 0) {
        setSelectedVoiceURI((prev) =>
          prev && filteredVoices.some((v) => v.voiceURI === prev)
            ? prev
            : pickDefaultFallbackVoice(filteredVoices)
        );
      } else {
        setSelectedVoiceURI("");
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speakPhrase = (text, options = {}) =>
    speakKinyarwandaPhrase(text, {
      ...options,
      selectedVoiceURI,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
    });

  if (!mod) {
    return (
      <main className="module-stage">
        <div className="container">
          <div className="module-shell">
            <h1>Module not found</h1>
            <Link to="/dashboard" className="btn-pill btn-pill-yellow">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const togglePracticed = (id) => {
    setPracticedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = [
    "All",
    ...new Set(KINYARWANDA_PHRASES.map((p) => p.category)),
  ];
  const visiblePhrases =
    phraseCategory === "All"
      ? KINYARWANDA_PHRASES
      : KINYARWANDA_PHRASES.filter((p) => p.category === phraseCategory);

  const correctScenariosCount = SCENARIO_QUIZZES.filter((q) => {
    const pickedIdx = answers[q.id];
    return pickedIdx !== undefined && q.options[pickedIdx]?.isCorrect;
  }).length;

  return (
    <main className="module-stage">
      <div className="container">
        <div className="module-top-nav">
          <Link to="/dashboard" className="btn-pill btn-pill-ghost btn-pill-sm">
            ← Back to Dashboard
          </Link>
          <span className="module-status-label">
            {mod.completed
              ? `Completed · +${mod.pointsEarned} pts`
              : `In Progress · +${reward.points} pts`}
          </span>
        </div>

        <article className="module-shell">
          <p className="module-kicker">/ ORIENTATION MODULE</p>
          <h1>{mod.title}</h1>
          <p className="module-summary">{mod.description}</p>

          <div className="module-content-body">
            {moduleId === "welcome" && (
              <div className="module-grid-2">
                {WELCOME_SECTIONS.map((sec) => (
                  <section key={sec.id} className="info-card">
                    <span className="info-card-tag">{sec.tag}</span>
                    <h2>{sec.title}</h2>
                    <p>{sec.summary}</p>
                    <ul className="tip-list">
                      {sec.tips.map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}

            {moduleId === "kinyarwanda" && (
              <>
                <QuickTranslator onSpeak={speakPhrase} isSpeaking={isSpeaking} />

                <div
                  className="auth-input-group"
                  style={{ maxWidth: "340px", marginBottom: "1.1rem" }}
                >
                  <label htmlFor="voice-select">
                    Fallback Pronunciation Voice (RW / SW / RN / FR)
                  </label>
                  {voices.length > 0 ? (
                    <select
                      id="voice-select"
                      value={selectedVoiceURI}
                      onChange={(e) => setSelectedVoiceURI(e.target.value)}
                    >
                      {voices.map((v) => (
                        <option key={v.voiceURI} value={v.voiceURI}>
                          {v.name} ({v.lang})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="phrase-note">
                      No Kinyarwanda, Swahili, Rundi, or French browser voices
                      installed—using local clips and Pindo audio.
                    </p>
                  )}
                </div>

                <div
                  className="filter-pills"
                  role="group"
                  aria-label="Filter phrases by category"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`filter-pill ${
                        phraseCategory === cat ? "is-selected" : ""
                      }`}
                      onClick={() => setPhraseCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="phrase-grid">
                  {visiblePhrases.map((phrase) => {
                    const isPracticed = practicedIds.includes(phrase.id);
                    return (
                      <section
                        key={phrase.id}
                        className={`phrase-card ${
                          isPracticed ? "is-practiced" : ""
                        }`}
                      >
                        <div>
                          <div className="phrase-top">
                            <div>
                              <h2 className="phrase-word">
                                {phrase.kinyarwanda}
                              </h2>
                              <span className="phrase-phonetic">
                                /{phrase.pronunciation}/
                              </span>
                            </div>
                            <span className="info-card-tag">
                              {phrase.category}
                            </span>
                          </div>
                          <p className="phrase-english">{phrase.english}</p>
                          <p className="phrase-example">{phrase.example}</p>
                          <p className="phrase-note">{phrase.contextNote}</p>
                        </div>

                        <div className="phrase-actions">
                          <button
                            type="button"
                            className="btn-pill btn-pill-ghost btn-pill-sm"
                            onClick={() =>
                              speakPhrase(phrase.kinyarwanda, {
                                phraseId: phrase.id,
                                lang: "rw",
                              })
                            }
                          >
                            🔊 Listen
                          </button>
                          <button
                            type="button"
                            className={`btn-pill btn-pill-sm ${
                              isPracticed ? "btn-pill-blue" : "btn-pill-ghost"
                            }`}
                            onClick={() => togglePracticed(phrase.id)}
                          >
                            {isPracticed ? "✓ Practiced" : "Mark Practiced"}
                          </button>
                        </div>
                      </section>
                    );
                  })}
                </div>
              </>
            )}

            {moduleId === "culture" && (
              <div className="module-grid-2">
                {CULTURE_CARDS.map((card) => (
                  <section key={card.id} className="info-card">
                    <span className="info-card-tag">{card.pillar}</span>
                    <h2>{card.title}</h2>
                    <p>{card.description}</p>
                    <div className="culture-takeaway">
                      <strong>Student Tip:</strong> {card.takeaway}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {moduleId === "history" && (
              <>
                {!historyUnlocked ? (
                  <div className="history-gate">
                    <h2>Context &amp; Sensitivity Note</h2>
                    <p>
                      This module presents an educational overview of Rwanda&apos;s
                      history, including the 1994 Genocide against the Tutsi and
                      the nation&apos;s journey of unity and reconciliation.
                      Please take a moment to approach this material thoughtfully
                      and respectfully.
                    </p>
                    <button
                      type="button"
                      className="btn-pill btn-pill-yellow"
                      onClick={() => setHistoryUnlocked(true)}
                    >
                      I Understand — Continue to Historical Overview
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="timeline-list">
                      {HISTORY_TIMELINE.map((item) => (
                        <section key={item.era} className="timeline-item">
                          <span className="timeline-era">{item.era}</span>
                          <h2>{item.title}</h2>
                          <p>{item.detail}</p>
                        </section>
                      ))}
                    </div>
                    <div className="history-sources">
                      <strong>Educational Reference Note:</strong> Summarized from
                      official Rwandan civic education resources and the Kigali
                      Genocide Memorial educational archive.
                    </div>
                  </>
                )}
              </>
            )}

            {moduleId === "scenarios" && (
              <div className="scenario-stack">
                <p className="module-reward-pill">
                  Score: {correctScenariosCount} / {SCENARIO_QUIZZES.length}{" "}
                  scenarios solved
                </p>
                {SCENARIO_QUIZZES.map((item, qIdx) => {
                  const chosenIdx = answers[item.id];
                  const chosenOption =
                    chosenIdx !== undefined ? item.options[chosenIdx] : null;
                  return (
                    <section key={item.id} className="scenario-card">
                      <span className="info-card-tag">
                        SCENARIO 0{qIdx + 1}
                      </span>
                      <p className="scenario-situation">{item.situation}</p>
                      <h2 className="scenario-question">{item.question}</h2>
                      <div className="scenario-options">
                        {item.options.map((opt, optIdx) => {
                          let stateClass = "";
                          if (chosenIdx === optIdx) {
                            stateClass = opt.isCorrect
                              ? "is-correct"
                              : "is-wrong";
                          }
                          return (
                            <button
                              key={opt.text}
                              type="button"
                              className={`scenario-opt-btn ${stateClass}`}
                              onClick={() =>
                                setAnswers((prev) => ({
                                  ...prev,
                                  [item.id]: optIdx,
                                }))
                              }
                            >
                              {opt.text}
                            </button>
                          );
                        })}
                      </div>
                      {chosenOption && (
                        <p
                          className={`scenario-feedback ${
                            chosenOption.isCorrect ? "ok" : "retry"
                          }`}
                        >
                          {chosenOption.feedback}
                        </p>
                      )}
                    </section>
                  );
                })}
              </div>
            )}
          </div>

          <div className="module-complete-bar module-reward-row">
            <span className="module-reward-pill">
              Reward: +{reward.points} pts &amp; &ldquo;{reward.badge}&rdquo;
              Badge
            </span>
            <button
              type="button"
              className="btn-pill btn-pill-yellow"
              onClick={() =>
                completeModule(mod.id, reward.points, reward.badge)
              }
            >
              {mod.completed
                ? "Completed ✓"
                : `Complete Module (+${reward.points} pts)`}
            </button>
          </div>
        </article>
      </div>
    </main>
  );
}