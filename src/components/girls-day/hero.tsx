"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/40 via-rose-50/30 to-amber-50/40 dark:from-pink-950/30 dark:via-rose-950/20 dark:to-amber-950/30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative max-w-5xl mx-auto text-center"
      >
        {/* Top badge */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full glass-card text-sm font-medium text-pink-600 dark:text-pink-300"
        >
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse-rose" />
          <span>تجلیل از فرشته‌های زمینی</span>
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse-rose" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight"
        >
          <span className="text-gradient-rose">روز دختر</span>
        </motion.h1>

        {/* Decorative heart */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <Heart
              className="w-16 h-16 text-pink-500 animate-heart-beat"
              fill="currentColor"
            />
            <div className="absolute inset-0 blur-xl bg-pink-400/50 -z-10" />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-xl sm:text-2xl md:text-3xl text-foreground/80 mb-4 font-medium leading-relaxed max-w-3xl mx-auto"
        >
          به نام دختری که لبخندش، جهان را بهار می‌کند
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          امروز روزِ جشنِ توست؛ روزی که یادآوری می‌کند
          مهربانی، شجاعت، و زیباییِ زنانه‌ات چقدر ارزشمند است.
          این صفحه هدیه‌ای کوچک برای تمام دختران دنیاست. 🌸
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <a
            href="#celebration"
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg glow-rose hover:scale-105 transition-transform"
          >
            <Heart className="w-5 h-5" fill="currentColor" />
            <span>شروع جشن</span>
            <span className="absolute inset-0 rounded-full shimmer pointer-events-none" />
          </a>
          <a
            href="#quotes"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass-card font-semibold text-pink-700 dark:text-pink-300 hover:scale-105 transition-transform"
          >
            <Sparkles className="w-5 h-5" />
            <span>نقل قول‌ها</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-pink-500"
      >
        <span className="text-sm font-medium">برای دیدن ادامه پیمایش کنید</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
