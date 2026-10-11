"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface Question {
  q: string;
  options: string[];
  correct: number;
  explain: string;
}

const QUESTIONS: Question[] = [
  {
    q: "روز دختر بین‌المللی در چه تاریخی برگزار می‌شود؟",
    options: ["۸ مارس", "۱۱ اکتبر", "۲۰ نوامبر", "۱ ژانویه"],
    correct: 1,
    explain:
      "روز دختر بین‌المللی از سال ۲۰۱۲ توسط سازمان ملل متحد در ۱۱ اکتبر برگزار می‌شود.",
  },
  {
    q: "هدف اصلی روز دختر چیست؟",
    options: [
      "فقط هدیه دادن به دختران",
      "افزایش آگاهی از چالش‌های دختران و ترویج برابری",
      "تعطیلی مدارس",
      "جشن تولد همه‌ی دختران",
    ],
    correct: 1,
    explain:
      "این روز یادآور تعهد جهانی به رفع چالش‌های دختران و توانمندسازی آن‌هاست.",
  },
  {
    q: "کدام دختر جوان، جایزه‌ی صلح نوبل را برای دفاع از حقوق دختران دریافت کرد؟",
    options: ["مالالا یوسف‌زی", "گریتا تونبرگ", "آنا کردووی", "ایما واتسون"],
    correct: 0,
    explain:
      "مالالا یوسف‌زی در سال ۲۰۱۴ و در ۱۷ سالگی جوان‌ترین دریافت‌کننده‌ی جایزه‌ی صلح نوبل شد.",
  },
  {
    q: "هر سال چند میلیون دختر از رفتن به مدرسه محروم می‌شوند؟",
    options: ["حدود ۱ میلیون", "حدود ۵ میلیون", "حدود ۱۳۰ میلیون", "حدود ۵۰۰ میلیون"],
    correct: 2,
    explain:
      "سازمان ملل متحد گزارش می‌دهد که حدود ۱۳۰ میلیون دختر در سراسر جهان از آموزش محروم‌اند.",
  },
  {
    q: "تم روز دختر بین‌المللی ۲۰۲۴ چه بود؟",
    options: [
      "آینده‌ی دیجیتالِ دختران",
      "سرمایه‌گذاری در دختران: رهبری برای آینده‌ای روشن",
      "پایان‌دادن به ازدواج زودهنگام",
      "دختران و تکنولوژی",
    ],
    correct: 1,
    explain:
      "تم سال ۲۰۲۴ بر توانمندسازی دختران به‌عنوان رهبران آینده تأکید داشت.",
  },
];

export function QuizSection() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState<boolean[]>([]);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = idx === QUESTIONS[current].correct;
    if (isCorrect) {
      setScore((s) => s + 1);
      toast.success("آفرین! درست جواب دادی 🎉");
    } else {
      toast.error("اشتباه بود، ولی مهم نیست — مهم یاد گرفتن است!");
    }
    setAnswered((arr) => [...arr, isCorrect]);
  };

  const handleNext = () => {
    if (current + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswered([]);
  };

  const q = QUESTIONS[current];
  const total = QUESTIONS.length;

  return (
    <section className="relative py-24 px-4 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full glass-card text-sm font-medium text-pink-600 dark:text-pink-300">
            <Brain className="w-4 h-4" />
            <span>بازیِ دانستنی‌ها</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            <span className="text-gradient-rose">چندتا می‌دونی؟</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            با این بازی کوتاه، اطلاعات خودت رو درباره‌ی روز دختر امتحان بزن
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-medium text-muted-foreground">
                    سوال {current + 1} از {total}
                  </span>
                  <span className="text-sm font-bold text-pink-600 dark:text-pink-300">
                    امتیاز: {score} / {total}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 rounded-full bg-pink-200/40 overflow-hidden mb-8">
                  <motion.div
                    className="h-full bg-gradient-to-l from-pink-500 to-amber-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${((current + 1) / total) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Question */}
                <h3 className="text-xl sm:text-2xl font-bold mb-6 leading-relaxed">
                  {q.q}
                </h3>

                {/* Options */}
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {q.options.map((opt, idx) => {
                    const isSelected = selected === idx;
                    const isCorrect = idx === q.correct;
                    const showResult = selected !== null;

                    let style =
                      "border-pink-200/50 hover:border-pink-400 hover:bg-pink-100/40 dark:hover:bg-pink-900/20";
                    if (showResult && isCorrect) {
                      style = "border-emerald-500 bg-emerald-100/50 dark:bg-emerald-900/30";
                    } else if (showResult && isSelected && !isCorrect) {
                      style = "border-red-500 bg-red-100/50 dark:bg-red-900/30";
                    } else if (showResult) {
                      style = "border-pink-200/30 opacity-60";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={selected !== null}
                        className={`flex items-center justify-between gap-3 p-4 rounded-2xl border-2 transition-all text-right ${style} ${
                          selected === null ? "cursor-pointer" : "cursor-default"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full bg-pink-200/60 dark:bg-pink-900/40 flex items-center justify-center text-sm font-bold text-pink-700 dark:text-pink-300">
                            {["الف", "ب", "ج", "د"][idx]}
                          </span>
                          <span className="text-sm sm:text-base">{opt}</span>
                        </span>
                        {showResult && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {selected !== null && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 rounded-2xl bg-pink-100/40 dark:bg-pink-900/20 border border-pink-200/40 mb-6">
                        <p className="text-sm leading-relaxed">
                          <span className="font-bold text-pink-700 dark:text-pink-300">
                            توضیح:{" "}
                          </span>
                          <span className="text-foreground/80">{q.explain}</span>
                        </p>
                      </div>
                      <button
                        onClick={handleNext}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform"
                      >
                        {current + 1 >= total ? "دیدن نتیجه" : "سوال بعدی"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ rotate: -20, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-pink-500 mb-6 shadow-2xl glow-gold"
                >
                  <Trophy className="w-10 h-10 text-white" />
                </motion.div>

                <h3 className="text-3xl font-black mb-2">
                  <span className="text-gradient-rose">
                    {score === total
                      ? "عالی! تمام را درست جواب دادی!"
                      : score >= total / 2
                      ? "آفرین! خوب جواب دادی"
                      : "مهم نیست، مهم شرکت کردن است!"}
                  </span>
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  امتیاز نهایی:{" "}
                  <span className="font-bold text-pink-600 dark:text-pink-300">
                    {score} از {total}
                  </span>
                </p>

                {/* Stars */}
                <div className="flex justify-center gap-2 mb-8">
                  {[...Array(total)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                    >
                      {i < score ? "⭐" : "☆"}
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card font-semibold text-pink-700 dark:text-pink-300 hover:scale-105 transition-transform"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>بازی دوباره</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
