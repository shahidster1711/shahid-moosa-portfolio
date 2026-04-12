import { Play, Square } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const voiceIntroSrc = "./assets/audio/voice-intro.wav";

function WaveformBars() {
  return (
    <span className="flex items-end gap-[3px] h-4" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="w-[3px] rounded-sm bg-primary"
          style={{
            animation: `waveform-bar 0.8s ease-in-out ${i * 0.1}s infinite alternate`,
            minHeight: "30%",
          }}
        />
      ))}
    </span>
  );
}

export function VoiceIntroButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(voiceIntroSrc);
    audio.preload = "none";
    audio.onended = () => {
      audio.currentTime = 0;
      setIsPlaying(false);
    };
    audio.onerror = () => {
      console.error("Voice intro audio failed to load:", voiceIntroSrc);
      setIsPlaying(false);
      setHasError(true);
    };
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasError(false);

    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Voice intro playback failed:", err);
          setIsPlaying(false);
          setHasError(true);
        });
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      aria-label={isPlaying ? "Stop voice intro" : "Play voice intro"}
      data-ocid="voice-intro-btn"
      className={[
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono",
        "border transition-smooth cursor-pointer select-none",
        hasError
          ? "bg-destructive/10 text-destructive border-destructive/40"
          : "bg-primary/10 text-primary",
        !hasError &&
          (isPlaying
            ? "border-primary/70 glow-primary"
            : "border-primary/30 hover:border-primary/60 hover:bg-primary/15"),
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {hasError ? (
        <>
          <Play className="w-3.5 h-3.5 shrink-0" />
          <span className="text-xs tracking-wide opacity-90">Retry</span>
        </>
      ) : isPlaying ? (
        <>
          <Square className="w-3.5 h-3.5 fill-primary shrink-0" />
          <WaveformBars />
          <span className="text-xs tracking-wide opacity-90">Playing…</span>
        </>
      ) : (
        <>
          <Play className="w-3.5 h-3.5 fill-primary shrink-0" />
          <span className="text-xs tracking-wide opacity-90">Voice Intro</span>
        </>
      )}
    </motion.button>
  );
}
