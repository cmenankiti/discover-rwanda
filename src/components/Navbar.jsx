import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLearner } from "../context/LearnerContext";
import FlagEmblem from "./FlagEmblem";

const MENU_ITEMS = [
  { label: "Home", path: "/", note: "Overview & orientation introduction" },
  { label: "Dashboard", path: "/dashboard", note: "Track progress, points & badges" },
  { label: "Kinyarwanda", path: "/modules/kinyarwanda", note: "Everyday greetings & phrases" },
  { label: "Scenarios", path: "/modules/scenarios", note: "Campus & community decisions" },
  { label: "Account", path: "/login", note: "Log in or create a learner profile" },
];

const REPEAT_CYCLES = 12;

export default function Navbar() {
  const { learner, signOut } = useLearner();
  const navigate = useNavigate();
  const drawerRef = useRef(null);
  const trackRef = useRef(null);
  const lastScrollTopRef = useRef(0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(MENU_ITEMS.length * 4);
  const [spinDeg, setSpinDeg] = useState(0);
  const [badgeTop, setBadgeTop] = useState(140);

  const continuousList = Array.from(
    { length: MENU_ITEMS.length * REPEAT_CYCLES },
    (_, i) => MENU_ITEMS[i % MENU_ITEMS.length]
  );

  useEffect(() => {
    if (!menuOpen) return;

    const centerIndex = MENU_ITEMS.length * 4;
    setActiveIdx(centerIndex);

    requestAnimationFrame(() => {
      if (trackRef.current) {
        const startScroll = trackRef.current.scrollHeight * 0.35;
        trackRef.current.scrollTop = startScroll;
        lastScrollTopRef.current = startScroll;
      }
    });

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((prev) => prev + 1);
        setSpinDeg((prev) => prev + 45);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((prev) => prev - 1);
        setSpinDeg((prev) => prev - 45);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const handleTrackScroll = () => {
    const el = trackRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const delta = scrollTop - lastScrollTopRef.current;

    if (Math.abs(delta) > 0.5) {
      setSpinDeg((prev) => prev + delta * 0.65);
    }

    const threshold = clientHeight * 0.6;
    let wrappedTop = scrollTop;

    if (scrollTop < threshold) {
      wrappedTop = scrollTop + scrollHeight * 0.4;
      el.scrollTop = wrappedTop;
    } else if (scrollTop + clientHeight > scrollHeight - threshold) {
      wrappedTop = scrollTop - scrollHeight * 0.4;
      el.scrollTop = wrappedTop;
    }

    lastScrollTopRef.current = wrappedTop;

    const rowHeight = 68;
    const approxIdx = Math.max(
      0,
      Math.floor((wrappedTop + clientHeight * 0.35) / rowHeight)
    );
    setActiveIdx(approxIdx);
  };

  const handleDrawerWheel = (e) => {
    if (Math.abs(e.deltaY) > 1) {
      setSpinDeg((prev) => prev + e.deltaY * 0.25);
    }
  };

  const handleItemHover = (indexInContinuous, e) => {
    setActiveIdx(indexInContinuous);
    setSpinDeg((prev) => prev + 30);
    if (drawerRef.current && e.currentTarget) {
      const containerRect = drawerRef.current.getBoundingClientRect();
      const itemRect = e.currentTarget.getBoundingClientRect();
      const clampedTop = Math.max(
        40,
        Math.min(
          itemRect.top - containerRect.top + itemRect.height / 2 - 42,
          containerRect.height - 130
        )
      );
      setBadgeTop(clampedTop);
    }
  };

  const handleLogOut = () => {
    signOut();
    setMenuOpen(false);
    navigate("/");
  };

  const currentItem =
    MENU_ITEMS[((activeIdx % MENU_ITEMS.length) + MENU_ITEMS.length) % MENU_ITEMS.length];

  return (
    <>
      <div className="flag-ribbon-bar" aria-hidden="true">
        <span className="stripe-blue" />
        <span className="stripe-yellow" />
        <span className="stripe-green" />
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <div className="brand-block">
            <Link
              to={learner.isAuthenticated ? "/dashboard" : "/"}
              className="brand-wordmark"
              onClick={() => setMenuOpen(false)}
            >
              Discover Rwanda
            </Link>
            <span className="brand-slash">/ ORIENTATION</span>
          </div>

          <div className="header-controls">
            {learner.isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn-pill btn-pill-ghost btn-pill-sm">
                  {learner.username} · {learner.points} pts
                </Link>
                <button
                  type="button"
                  onClick={handleLogOut}
                  className="btn-pill btn-pill-yellow btn-pill-sm"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-pill btn-pill-ghost btn-pill-sm">
                  Log In
                </Link>
                <Link to="/login" className="btn-pill btn-pill-yellow btn-pill-sm">
                  Sign Up
                </Link>
              </>
            )}

            <button
              type="button"
              className="menu-trigger"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          ref={drawerRef}
          className="fullscreen-drawer"
          role="dialog"
          aria-label="Full-screen site navigation"
          onWheel={handleDrawerWheel}
        >
          <button
            type="button"
            className="drawer-close-btn"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>

          <div className="container drawer-grid">
            <aside className="drawer-meta">
              <p className="drawer-kicker">Rwanda Orientation</p>
              <p className="drawer-copy">
                Scroll continuously through the menu or select a section to open.
              </p>
              <div className="drawer-links-secondary">
                <Link to="/modules/welcome" onClick={() => setMenuOpen(false)}>
                  Welcome to Rwanda
                </Link>
                <Link to="/modules/culture" onClick={() => setMenuOpen(false)}>
                  Culture & Daily Life
                </Link>
                <Link to="/modules/history" onClick={() => setMenuOpen(false)}>
                  History & Memory
                </Link>
              </div>
              <p className="drawer-footer-tag">Discover Rwanda · Kigali</p>
            </aside>

            <div className="drawer-center-track">
              <Link
                to={currentItem.path}
                className="drawer-open-badge"
                style={{ top: `${badgeTop}px` }}
                onClick={() => setMenuOpen(false)}
              >
                Open
              </Link>

              <nav
                ref={trackRef}
                className="drawer-stack drawer-scroll-reel"
                aria-label="Continuous navigation"
                onScroll={handleTrackScroll}
              >
                {continuousList.map((item, idx) => {
                  const isFocused = idx === activeIdx;
                  return (
                    <Link
                      key={`${item.path}-${idx}`}
                      to={item.path}
                      className={`drawer-item ${isFocused ? "is-active" : ""}`}
                      onMouseEnter={(e) => handleItemHover(idx, e)}
                      onFocus={(e) => handleItemHover(idx, e)}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="drawer-visual">
              <FlagEmblem
                variant="drawer"
                activeIndex={activeIdx}
                tiltDeg={spinDeg}
              />
              <p className="drawer-prism-caption">/ {currentItem.note}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}