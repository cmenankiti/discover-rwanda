# Discover Rwanda

An interactive student orientation web application built with React and Vite to help incoming students and newcomers in Rwanda build confidence with everyday Kinyarwanda phrases, cultural etiquette, historical context, and campus scenarios.

## Features

- **Kinyarwanda Starter & Phrase Lookup:** Practice essential greetings and phrases with local MP3 pronunciation audio (`public/audio/`), speech synthesis fallback, and quick phrase lookup.
- **Culture, History & Campus Scenarios:** Explore interactive orientation modules, etiquette takeaways, timeline context, and decision-based scenarios with points and badges.
- **Local-First Learner Progress:** Sign up or log in with `localStorage`-backed profiles (`discover_rwanda_accounts_v1` and `discover_rwanda_session_v1`) to track completed modules, points, and earned badges.
- **Responsive Dark UI:** Styled with a custom Rwandan flag-inspired palette and responsive breakpoints across desktop and mobile viewports.

## Project Structure

- `public/audio/` — Kinyarwanda starter phrase `.mp3` files
- `src/pages/` — Route views (`LandingPage.jsx`, `ProfileSetupPage.jsx`, `DashboardPage.jsx`, `ModuleViewPage.jsx`)
- `src/components/` — Reusable UI components (`Navbar.jsx`, `FlagEmblem.jsx`, `ModuleCard.jsx`, `QuickTranslator.jsx`)
- `src/context/LearnerContext.jsx` — Learner authentication and progress state
- `src/data/orientationData.js` — Orientation modules, phrases, culture notes, and scenarios
- `src/shared/` — Audio playback/speech utilities and phrase lookup helpers
- `src/styles/` — Global and module stylesheets (`global.css`, `modules.css`)

## Notes on Persistence 
Learner accounts, session state, and module progress are stored locally in the browser via localStorage without a remote backend, so data persists across reloads and sign-outs on the same browser and origin unless browser storage is cleared.

## Getting Started 

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Run linter
npm run lint

# Create a production build
npm run build
