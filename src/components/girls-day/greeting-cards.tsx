"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Heart, Copy, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Card {
  emoji: string;
  title: string;
  message: string;
  gradient: string;
}

const CARDS: Card[] = [
  {
    emoji: "🌸",
    title: "تولدِ قشنگت",
    message:
      "روزِ توست! گلِ بهارِ من، تو زیباترین شکوفه‌ی زندگی‌ام هستی. امیدوارم هر روزِ زندگیت پر از خنده و عطرِ گل‌های زیبا باشد.",
    gradient: "from-pink-400 via-rose-400 to-amber-300",
  },
  {
    emoji: "💫",
    title: "به دختری که می‌درخشد",
    message:
      "هر بار که تو را می‌بینم، در زیباییِ روحت غرق می‌شوم. تو نه‌تنها ظاهری زیبا داری، بلکه قلبی داری که جهان را روشن می‌کند.",
    gradient: "from-violet-400 via-pink-400 to-amber-300",
  },
  {
    emoji: "🌹",
    title: "تقدیم به گلِ باغ",
    message:
      "می‌گویند هر گل، زبانی دارد. اما تو تنها گلی هستی که با لبخندت، هزاران کلمه را می‌گویی. روزت مبارک، گلِ زیبای زندگی.",
    gradient: "from-rose-400 via-pink-500 to-fuchsia-400",
  },
  {
    emoji: "🦋",
    title: "پروانه‌ی زیبا",
    message:
      "مانند پروانه‌ای که در آسمان آزاد می‌پرد، تو هم با شجاعت به دنبال آرزوهایت برو. زیبایی‌ات در پروازت نهفته است.",
    gradient: "from-amber-300 via-pink-400 to-violet-400",
  },
  {
    emoji: "👑",
    title: "ملکه‌ی قلبم",
    message:
      "تو ملکه‌ی جهانِ من هستی. با مهربانی‌ات پادشاهی می‌کنی، با خنده‌ات تاج می‌گذاری، و با حضورت قلعه‌ام را خانه می‌کنی.",
    gradient: "from-amber-400 via-rose-400 to-pink-500",
  },
  {
    emoji: "🌷",
    title: "لاله‌ی بهاری",
    message:
      "تو لاله‌ی بهارِ زندگی‌ام هستی. هر روز، با دیدنِ تو، زمین سبز می‌شود و آسمان آبی می‌شود. روزت پر از نور و عشق باد.",
    gradient: "from-pink-300 via-rose-300 to-amber-200",
  },
];

export function GreetingCards() {
  const [copied, setCopied] = useState<number | null>(null);

  const handleCopy = async (msg: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(msg);
      setCopied(idx);
      toast.success("متن کپی شد! ❤️", {
        description: "حالا می‌تونی برایش بفرستی",
      });
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error("کپی نشد، لطفاً دستی کپی کن");
    }
  };

  const handleSend = (card: Card) => {
    const subject = encodeURIComponent(`🌸 ${card.title}`);
    const body = encodeURIComponent(`${card.message}\n\n— تقدیم با عشق`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <section className="relative py-24 px-4 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full glass-card text-sm font-medium text-pink-600 dark:text-pink-300">
            <Mail className="w-4 h-4" />
            <span>کارت‌های تبریک</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            <span className="text-gradient-rose">کارت‌های آماده</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            شش کارت تبریک زیبا و آماده‌ی ارسال. یکیش را انتخاب کن، کپی کن یا
            ایمیل کن
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARDS.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, rotateZ: -2 }}
              whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, rotateZ: 1 }}
              className="group relative glass-card rounded-3xl p-6 overflow-hidden"
            >
              {/* Card visual */}
              <div
                className={`relative h-44 mb-4 rounded-2xl bg-gradient-to-br ${card.gradient} overflow-hidden flex items-center justify-center shadow-inner`}
              >
                {/* Decorative hearts */}
                <div className="absolute top-3 right-3 opacity-30">
                  <Heart className="w-6 h-6 text-white" fill="currentColor" />
                </div>
                <div className="absolute bottom-3 left-3 opacity-30">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-8 opacity-20">
                  <Heart className="w-4 h-4 text-white" fill="currentColor" />
                </div>

                <div className="text-6xl drop-shadow-lg group-hover:scale-110 transition-transform">
                  {card.emoji}
                </div>

                <div className="absolute inset-0 shimmer opacity-30 pointer-events-none" />
              </div>

              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Heart
                  className="w-4 h-4 text-pink-500"
                  fill="currentColor"
                />
                {card.title}
              </h3>

              <p className="text-sm text-foreground/70 leading-relaxed mb-4 line-clamp-4 min-h-[5rem]">
                {card.message}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(card.message, idx)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-pink-100/60 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs font-medium hover:bg-pink-200/60 dark:hover:bg-pink-900/50 transition-colors"
                >
                  {copied === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>کپی شد</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>کپی متن</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleSend(card)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-medium hover:scale-105 transition-transform"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>ایمیل کن</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
