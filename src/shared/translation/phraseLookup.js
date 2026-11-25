import { KINYARWANDA_PHRASES } from "../../data/orientationData";

export function normalizePhrase(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[?!.,'"]/g, "")
    .replace(/\s+/g, " ");
}

export function findStarterPhraseMatch(query, direction = "en-rw") {
  const normalizedQuery = normalizePhrase(query);
  if (!normalizedQuery) return null;

  return (
    KINYARWANDA_PHRASES.find((item) => {
      const target =
        direction === "en-rw" ? item.english : item.kinyarwanda;
      return normalizePhrase(target) === normalizedQuery;
    }) || null
  );
}