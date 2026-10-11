"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, Music, Heart, RotateCcw } from "lucide-react";

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(45); // fallback
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoaded = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onTime = () => setProgress(audio.currentTime);
    const onEnd = () => setPlaying(false);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {
        // autoplay may be blocked — try again on next click
      });
      setPlaying(true);
    }
  };

  const restart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setProgress(0);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    // RTL: right edge is 0, left edge is duration
    const x = e.clientX - rect.left;
    const ratio = 1 - x / rect.width;
    audio.currentTime = ratio * duration;
    setProgress(audio.currentTime);
  };

  const formatTime = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progressPct = duration ? (progress / duration) * 100 : 0;

  return (
    <section className="relative py-24 px-4 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full glass-card text-sm font-medium text-pink-600 dark:text-pink-300">
            <Music className="w-4 h-4" />
            <span>آهنگ روز دختر</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            <span className="text-gradient-rose">آوازِ قلب</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            آهنگی ملایم و احساسی، تقدیم به تمام دختران زیبای دنیا
          </p>
        </div>

        {/* Player card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400/10 via-rose-300/10 to-amber-300/10" />

          {/* Animated equalizer bars */}
          <div className="absolute top-6 left-6 flex items-end gap-1 h-12">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                animate={
                  playing
                    ? { height: [8, 40, 16, 32, 8] }
                    : { height: 8 }
                }
                transition={{
                  duration: 0.8 + i * 0.1,
                  repeat: playing ? Infinity : 0,
                  ease: "easeInOut",
                }}
                className="w-1.5 rounded-full bg-gradient-to-t from-pink-500 to-amber-400"
                style={{ height: 8 }}
              />
            ))}
          </div>

          <div className="relative flex items-center gap-6">
            {/* Album cover */}
            <motion.div
              animate={playing ? { rotate: 360 } : { rotate: 0 }}
              transition={{
                duration: 8,
                repeat: playing ? Infinity : 0,
                ease: "linear",
              }}
              className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-pink-400 via-rose-500 to-amber-400 flex items-center justify-center shadow-2xl glow-rose flex-shrink-0"
            >
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-pink-300 to-rose-400 opacity-50" />
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/40" />
              <Heart
                className="w-8 h-8 text-white relative z-10 animate-heart-beat"
                fill="currentColor"
              />
              <div className="absolute inset-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-inner" />
            </motion.div>

            {/* Track info & controls */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-bold mb-1 truncate">
                آوازِ پرواز
              </h3>
              <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-pink-500" fill="currentColor" />
                <span>تقدیم به دخترانِ دنیا</span>
              </p>

              {/* Progress bar */}
              <div className="mb-3">
                <div
                  onClick={seek}
                  className="relative h-2 rounded-full bg-pink-200/50 overflow-hidden cursor-pointer"
                >
                  <div
                    className="absolute inset-y-0 right-0 bg-gradient-to-l from-pink-500 to-amber-400 rounded-full"
                    style={{ width: `${progressPct}%` }}
                  />
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg border-2 border-pink-500"
                    style={{ right: `calc(${progressPct}% - 8px)` }}
                  />
                </div>
              </div>

              {/* Time + controls */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-mono text-muted-foreground">
                  {formatTime(progress)}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={restart}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-pink-600 dark:text-pink-300 hover:bg-pink-100/50 dark:hover:bg-pink-900/20 transition-colors"
                    aria-label="شروع مجدد"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={toggle}
                    className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-lg glow-rose hover:scale-110 transition-transform"
                    aria-label={playing ? "توقف" : "پخش"}
                  >
                    {playing ? (
                      <Pause className="w-5 h-5" fill="currentColor" />
                    ) : (
                      <Play className="w-5 h-5 mr-0.5" fill="currentColor" />
                    )}
                    <span className="absolute inset-0 rounded-full shimmer pointer-events-none" />
                  </button>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2 mt-4 text-pink-500">
                <Volume2 className="w-4 h-4" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1.5 accent-pink-500 cursor-pointer"
                  aria-label="صدا"
                />
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
            ♪ آهنگ اصلی و کپی‌رایت‌آزاد — ساخته‌شده با عشق برای این پروژه
          </p>
        </div>
      </motion.div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="audio/girls-day-music.mp3"
        preload="metadata"
      />
    </section>
  );
}
