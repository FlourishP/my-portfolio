"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

const CLICK_SOUND_URL = "/audio/click.wav";
const STORAGE_KEY = "portfolio-sound";

interface SoundContextValue {
  soundEnabled: boolean;
  toggleSound: () => void;
  setSoundEnabled: (v: boolean) => void;
  playClick: () => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

let audioCtx: AudioContext | null = null;
let clickBuffer: AudioBuffer | null = null;
let bufferLoaded = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function loadClickBuffer() {
  if (bufferLoaded || typeof window === "undefined") return;
  const ctx = getAudioContext();
  if (!ctx) return;
  fetch(CLICK_SOUND_URL)
    .then((res) => res.arrayBuffer())
    .then((data) => ctx.decodeAudioData(data))
    .then((buf) => {
      clickBuffer = buf;
      bufferLoaded = true;
    })
    .catch(() => {});
}

function playClickRaw() {
  try {
    const ctx = getAudioContext();
    if (!ctx || !clickBuffer) return;
    if (ctx.state === "suspended") {
      ctx.resume().then(() => {
        const source = ctx.createBufferSource();
        source.buffer = clickBuffer;
        const gain = ctx.createGain();
        gain.gain.value = 0.4;
        source.connect(gain).connect(ctx.destination);
        source.start(0);
      });
    } else {
      const source = ctx.createBufferSource();
      source.buffer = clickBuffer;
      const gain = ctx.createGain();
      gain.gain.value = 0.4;
      source.connect(gain).connect(ctx.destination);
      source.start(0);
    }
  } catch {}
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabledState] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      setSoundEnabledState(stored === "true");
    }
    setMounted(true);
    loadClickBuffer();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, String(soundEnabled));
  }, [soundEnabled, mounted]);

  const toggleSound = useCallback(() => {
    setSoundEnabledState((p) => !p);
  }, []);

  const setSoundEnabled = useCallback((v: boolean) => {
    setSoundEnabledState(v);
  }, []);

  const playClick = useCallback(() => {
    if (soundEnabled) {
      playClickRaw();
    }
  }, [soundEnabled]);

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, setSoundEnabled, playClick }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    return {
      soundEnabled: true,
      toggleSound: () => {},
      setSoundEnabled: () => {},
      playClick: () => {},
    };
  }
  return ctx;
}
