const PINDO_RW_TTS_URL = "https://api.pindo.io/ai/tts/rw/public";

// Only allow Kinyarwanda, Swahili, Rundi, and French fallback voices
const ALLOWED_FALLBACK_LANG_REGEX = /^(rw|sw|rn|fr)(-|$)/i;
const ALLOWED_FALLBACK_NAME_REGEX = /\b(kinyarwanda|swahili|kiswahili|rundi|kirundi|french|français)\b/i;

export function getFilteredFallbackVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return [];
  }

  return window.speechSynthesis.getVoices().filter((voice) => {
    const langMatch = ALLOWED_FALLBACK_LANG_REGEX.test(voice.lang || "");
    const nameMatch = ALLOWED_FALLBACK_NAME_REGEX.test(voice.name || "");
    return langMatch || nameMatch;
  });
}

export function pickDefaultFallbackVoice(voices) {
  if (!voices.length) return "";
  const preferred =
    voices.find((v) => /^rw(-|$)/i.test(v.lang)) ||
    voices.find((v) => /^rn(-|$)/i.test(v.lang)) ||
    voices.find((v) => /^sw(-|$)/i.test(v.lang)) ||
    voices.find((v) => /^fr(-|$)/i.test(v.lang)) ||
    voices[0];

  return preferred.voiceURI;
}

export function playAudioFile(src) {
  return new Promise((resolve, reject) => {
    const audio = new Audio(src);
    audio.onended = () => resolve();
    audio.onerror = (err) => reject(err);
    audio.play().catch(reject);
  });
}

export function speakWithFilteredBrowserTTS(text, selectedVoiceURI, onDone) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    onDone?.();
    return false;
  }

  const allowedVoices = getFilteredFallbackVoices();
  if (!allowedVoices.length) {
    onDone?.();
    return false;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const chosenVoice =
    allowedVoices.find((v) => v.voiceURI === selectedVoiceURI) ||
    allowedVoices[0];

  utterance.voice = chosenVoice;
  utterance.lang = chosenVoice.lang;
  utterance.rate = 0.88;
  utterance.pitch = 1.0;
  utterance.onend = () => onDone?.();
  utterance.onerror = () => onDone?.();

  window.speechSynthesis.speak(utterance);
  return true;
}

export async function speakKinyarwandaPhrase(
  text,
  { phraseId = null, lang = "rw", selectedVoiceURI = "", onStart, onEnd } = {}
) {
  const cleanText = typeof text === "string" ? text.trim() : "";
  if (!cleanText) return;

  onStart?.();

  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  // 1. Pre-recorded local clip in public/audio/<phraseId>.mp3
  if (phraseId) {
    try {
      await playAudioFile(`/audio/${phraseId}.mp3`);
      onEnd?.();
      return;
    } catch {
      // Fall through to Pindo TTS / filtered browser speechSynthesis
    }
  }

  // 2. Pindo public Kinyarwanda TTS for dynamic RW phrases
  if (lang === "rw") {
    try {
      const response = await fetch(PINDO_RW_TTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: cleanText,
          speech_rate: 0.95,
        }),
      });

      if (response.ok) {
        const payload = await response.json();
        const generatedUrl = payload?.data?.generated_audio_url;
        if (generatedUrl) {
          await playAudioFile(generatedUrl);
          onEnd?.();
          return;
        }
      }
    } catch {
      // Fall through to filtered browser speechSynthesis
    }
  }

  // 3. Browser speechSynthesis fallback (strictly rw, sw, rn, or fr)
  speakWithFilteredBrowserTTS(cleanText, selectedVoiceURI, onEnd);
}