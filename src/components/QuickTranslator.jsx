import { useEffect, useState } from "react";
import { findStarterPhraseMatch } from "../shared/translation/phraseLookup";

const QUICK_PROMPTS = [
  { label: "Muraho", dir: "rw-en" },
  { label: "Amakuru?", dir: "rw-en" },
  { label: "Murakoze cyane", dir: "rw-en" },
  { label: "Good morning", dir: "en-rw" },
  { label: "How much is it?", dir: "en-rw" },
];

const EXTRA_PAIRS = [
  { id: "yego", rw: "Yego", en: "Yes", phonetic: "YEH-goh" },
  { id: "oya", rw: "Oya", en: "No", phonetic: "OH-yah" },
  {
    id: "uraho-mumeze-mute",
    rw: "Uraho? / Mumeze mute?",
    en: "Are you well? / How are you all doing?",
    phonetic: "oo-RAH-ho / moo-MEH-zeh MOO-teh",
  },
  {
    id: "ndi-umunyeshuri",
    rw: "Ndi umunyeshuri",
    en: "I am a student",
    phonetic: "ndee oo-moo-nyeh-SHOO-ree",
  },
];

function findLocalMatch(input, direction) {
  const starter = findStarterPhraseMatch(input, direction);
  if (starter) {
    return {
      phraseId: starter.id,
      translation:
        direction === "rw-en" ? starter.english : starter.kinyarwanda,
      phonetic: starter.pronunciation,
    };
  }

  const query = input.trim().toLowerCase();
  if (!query) return null;

  const extraHit = EXTRA_PAIRS.find((item) => {
    const sourceText = direction === "rw-en" ? item.rw : item.en;
    return (
      sourceText.toLowerCase().includes(query) ||
      query.includes(sourceText.toLowerCase().split("(")[0].trim())
    );
  });

  if (!extraHit) return null;

  return {
    phraseId: extraHit.id,
    translation: direction === "rw-en" ? extraHit.en : extraHit.rw,
    phonetic: extraHit.phonetic,
  };
}

async function fetchOnlineTranslation(text, direction, signal) {
  const langpair = direction === "rw-en" ? "rw-RW|en-GB" : "en-GB|rw-RW";
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    text.trim()
  )}&langpair=${encodeURIComponent(langpair)}`;

  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Translation request failed (${res.status})`);
  const data = await res.json();
  const translated = data?.responseData?.translatedText;
  if (!translated) throw new Error("Empty translation response");
  return translated;
}

export default function QuickTranslator({ onSpeak, isSpeaking = false }) {
  const [direction, setDirection] = useState("rw-en");
  const [inputText, setInputText] = useState("Muraho");
  const [remoteResult, setRemoteResult] = useState(null);

  const sourceLabel = direction === "rw-en" ? "Kinyarwanda" : "English";
  const targetLabel = direction === "rw-en" ? "English" : "Kinyarwanda";

  const trimmed = inputText.trim();
  const localHit = trimmed ? findLocalMatch(trimmed, direction) : null;
  const needsOnline = Boolean(trimmed) && !localHit;

  useEffect(() => {
    if (!needsOnline) return;

    const queryKey = `${direction}::${trimmed}`;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setRemoteResult({
        key: queryKey,
        phraseId: null,
        translation: "",
        phonetic: "",
        source: "online",
        loading: true,
      });

      try {
        const onlineText = await fetchOnlineTranslation(
          trimmed,
          direction,
          controller.signal
        );
        setRemoteResult({
          key: queryKey,
          phraseId: null,
          translation: onlineText,
          phonetic: "",
          source: "online",
          loading: false,
        });
      } catch (err) {
        if (err.name === "AbortError") return;
        setRemoteResult({
          key: queryKey,
          phraseId: null,
          translation:
            "Couldn't reach the online translator right now. Check your connection or try a starter phrase like 'Muraho' or 'Good morning'.",
          phonetic: "",
          source: "error",
          loading: false,
        });
      }
    }, 450);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [needsOnline, trimmed, direction]);

  const currentQueryKey = `${direction}::${trimmed}`;
  const matchingRemote =
    needsOnline && remoteResult?.key === currentQueryKey ? remoteResult : null;

  const result = !trimmed
    ? {
        phraseId: null,
        translation: "",
        phonetic: "",
        source: "empty",
        loading: false,
      }
    : localHit
    ? {
        phraseId: localHit.phraseId,
        translation: localHit.translation,
        phonetic: localHit.phonetic,
        source: "local",
        loading: false,
      }
    : matchingRemote || {
        phraseId: null,
        translation: "",
        phonetic: "",
        source: "online",
        loading: true,
      };

  const handleSwap = () => {
    setDirection((prev) => (prev === "rw-en" ? "en-rw" : "rw-en"));
    if (result.translation && result.source !== "error") {
      setInputText(result.translation);
    }
  };

  return (
    <section
      className="info-card translator-card"
      aria-label="Quick Kinyarwanda and English translator"
    >
      <div className="phrase-top translator-header">
        <div>
          <span className="info-card-tag">
            PHRASE TRANSLATOR ·{" "}
            {result.source === "online" ? "ONLINE API" : "STARTER PACK"}
          </span>
          <h2 className="translator-title">
            {sourceLabel} → {targetLabel}
          </h2>
        </div>
        <button
          type="button"
          className="btn-pill btn-pill-ghost btn-pill-sm"
          onClick={handleSwap}
        >
          ⇄ Swap Languages
        </button>
      </div>

      <div className="filter-pills translator-chips">
        {QUICK_PROMPTS.map((chip) => (
          <button
            key={chip.label}
            type="button"
            className="filter-pill"
            onClick={() => {
              setDirection(chip.dir);
              setInputText(chip.label);
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <div className="module-grid-2">
        <div className="auth-input-group">
          <label htmlFor="translator-input">{sourceLabel}</label>
          <input
            id="translator-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Type any ${sourceLabel} word or phrase...`}
          />
        </div>

        <div className="auth-input-group">
          <label>{targetLabel}</label>
          <div className="phrase-example translator-output">
            <strong
              role={result.source === "error" ? "alert" : undefined}
              style={
                result.source === "error" ? { color: "#f87171" } : undefined
              }
            >
              {result.loading
                ? "Translating..."
                : result.translation || "Translation will appear here."}
            </strong>
            {result.phonetic && (
              <div className="phrase-phonetic translator-phonetic">
                /{result.phonetic}/
              </div>
            )}
          </div>
        </div>
      </div>

      {!result.loading &&
        result.translation &&
        result.source !== "error" &&
        direction === "en-rw" &&
        onSpeak && (
          <div className="phrase-actions translator-speak">
            <button
              type="button"
              className="btn-pill btn-pill-ghost btn-pill-sm"
              disabled={isSpeaking}
              onClick={() =>
                onSpeak(result.translation, {
                  phraseId: result.phraseId,
                  lang: "rw",
                })
              }
            >
              {isSpeaking ? "🔊 Playing..." : "🔊 Listen to Kinyarwanda"}
            </button>
          </div>
        )}
    </section>
  );
}