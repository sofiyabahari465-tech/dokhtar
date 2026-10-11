"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarHeart, Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// International Day of the Girl Child is October 11
function getNextGirlsDay(): Date {
  const now = new Date();
  const year = now.getUTCFullYear();
  // October 11 (month is 0-indexed, so 9 = October)
  let next = new Date(Date.UTC(year, 9, 11, 0, 0, 0));
  if (next.getTime() <= now.getTime()) {
    next = new Date(Date.UTC(year + 1, 9, 11, 0, 0, 0));
  }
  return next;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownSection() {
  const [target] = useState(getNextGirlsDay);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calcTimeLeft(target)
  );

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(calcTimeLeft(target));
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const items: { label: string; value: number }[] = [
    { label: "روز", value: timeLeft.days },
    { label: "ساعت", value: timeLeft.hours },
    { label: "دقیقه", value: timeLeft.minutes },
    { label: "ثانیه", value: timeLeft.seconds },
  ];

  const targetDateStr = new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(target);

  return (
    <section className="relative py-24 px-4 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full glass-card text-sm font-medium text-pink-600 dark:text-pink-300">
          <CalendarHeart className="w-4 h-4" />
          <span>شمارش معکوس</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
          <span className="text-gradient-rose">تا روز دختر بعدی</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
          روز دختر بین‌المللی هر سال در ۱۱ اکتبر برگزار می‌شود.
          <br />
          <span className="inline-flex items-center gap-1.5 mt-2 text-pink-600 dark:text-pink-300 font-medium">
            <Clock className="w-4 h-4" />
            تاریخ: {targetDateStr}
          </span>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.04 }}
              className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden"
            >
              <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-pink-400/20 blur-2xl" />
              <motion.div
                key={item.value}
                initial={{ scale: 1.2, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative text-5xl sm:text-6xl md:text-7xl font-black text-gradient-rose tabular-nums"
              >
                {item.value.toString().padStart(2, "0")}
              </motion.div>
              <div className="relative mt-2 text-sm sm:text-base font-medium text-muted-foreground">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-sm text-muted-foreground mt-8 italic"
        >
          «هر روزِ دخترانِ دنیا ارزش جشن گرفتن دارد، اما امروز، روزِ تجلیل است.»
        </motion.p>
      </motion.div>
    </section>
  );
}
