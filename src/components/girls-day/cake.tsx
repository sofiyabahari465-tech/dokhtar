"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cake, Heart, PartyPopper, Sparkles } from "lucide-react";

export function CakeSection() {
  const [blown, setBlown] = useState(false);

  return (
    <section
      id="celebration"
      className="relative py-24 px-4 z-10"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full glass-card text-sm font-medium text-pink-600 dark:text-pink-300">
            <Cake className="w-4 h-4" />
            <span>کیکِ جشن</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            <span className="text-gradient-rose">قندِ شیرینِ جشن</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
            شمع‌ها را فوت کن و آرزویت را بکن. هر دختر، یک آرزوی زیبا برای آینده‌اش
            دارد.
          </p>
        </motion.div>

        {/* Cake visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md aspect-square flex items-center justify-center"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-radial from-pink-400/30 via-amber-300/20 to-transparent blur-3xl" />

          {/* Cake SVG */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80">
            {/* Plate */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-72 h-3 rounded-full bg-gradient-to-r from-pink-200 via-amber-200 to-pink-200 shadow-lg" />

            {/* Bottom layer */}
            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-64 h-32 rounded-t-3xl bg-gradient-to-b from-pink-300 to-rose-400 shadow-xl overflow-hidden">
              {/* Frosting drips */}
              <svg
                className="absolute top-0 left-0 w-full"
                viewBox="0 0 256 30"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 0 L256 0 L256 12 C240 22 224 8 208 16 C192 24 176 10 160 18 C144 26 128 12 112 18 C96 24 80 10 64 16 C48 22 32 8 16 14 C8 17 4 14 0 16 Z"
                  fill="#fff5f7"
                />
              </svg>
              {/* Sprinkles */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-3 rounded-full"
                  style={{
                    top: `${20 + (i % 3) * 15}%`,
                    left: `${15 + (i * 7) % 70}%`,
                    background: [
                      "#ff6b9d",
                      "#ffd700",
                      "#ff8c69",
                      "#c44569",
                    ][i % 4],
                    transform: `rotate(${i * 30}deg)`,
                  }}
                />
              ))}
            </div>

            {/* Top layer */}
            <div className="absolute bottom-36 left-1/2 -translate-x-1/2 w-44 h-24 rounded-t-2xl bg-gradient-to-b from-rose-300 to-rose-500 shadow-lg overflow-hidden">
              <svg
                className="absolute top-0 left-0 w-full"
                viewBox="0 0 176 24"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 0 L176 0 L176 10 C160 18 144 6 128 14 C112 22 96 8 80 14 C64 20 48 8 32 14 C16 20 8 12 0 12 Z"
                  fill="#ffe4ec"
                />
              </svg>
            </div>

            {/* Candles */}
            <div className="absolute bottom-56 left-1/2 -translate-x-1/2 flex gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="relative flex flex-col items-center">
                  {/* Flame */}
                  <AnimatePresence>
                    {!blown && (
                      <motion.div
                        exit={{ opacity: 0, scale: 0 }}
                        className="relative mb-1"
                      >
                        <div className="w-3 h-5 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 animate-candle-flicker origin-bottom shadow-[0_0_12px_rgba(255,200,80,0.8)]" />
                        <div className="absolute inset-0 w-3 h-3 mx-auto rounded-full bg-yellow-200 blur-sm animate-candle-flicker" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* Smoke after blow */}
                  <AnimatePresence>
                    {blown && (
                      <motion.div
                        initial={{ opacity: 0.8, y: 0 }}
                        animate={{ opacity: 0, y: -40 }}
                        transition={{ duration: 1.5 }}
                        className="text-2xl text-gray-400 mb-1"
                      >
                        🌫️
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* Candle body */}
                  <div className="w-2 h-14 rounded-full bg-gradient-to-b from-pink-200 to-pink-400 shadow-inner" />
                  {/* Stripes */}
                  <div
                    className="absolute top-14 w-2 h-14 rounded-full opacity-40"
                    style={{
                      background:
                        "repeating-linear-gradient(45deg, transparent, transparent 3px, #fff 3px, #fff 5px)",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Heart decorations */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-4 right-4"
            >
              <Heart
                className="w-8 h-8 text-pink-500"
                fill="currentColor"
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute top-12 left-4"
            >
              <Sparkles className="w-6 h-6 text-amber-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Blow button */}
        <motion.button
          onClick={() => setBlown(true)}
          disabled={blown}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: blown ? 1 : 1.05 }}
          whileTap={{ scale: blown ? 1 : 0.95 }}
          className={`relative inline-flex items-center gap-2 px-8 py-4 mt-12 rounded-full font-semibold text-white shadow-lg transition-all ${
            blown
              ? "bg-gradient-to-r from-emerald-400 to-teal-400 cursor-default"
              : "bg-gradient-to-r from-pink-500 to-rose-500 glow-rose hover:shadow-2xl"
          }`}
        >
          {blown ? (
            <>
              <PartyPopper className="w-5 h-5" />
              <span>آرزویت برآورده شود!</span>
            </>
          ) : (
            <>
              <Heart className="w-5 h-5" fill="currentColor" />
              <span>فوت کن و آرزو کن</span>
              <span className="absolute inset-0 rounded-full shimmer pointer-events-none" />
            </>
          )}
        </motion.button>
      </div>
    </section>
  );
}
