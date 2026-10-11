"use client";

import { motion } from "framer-motion";
import { BookOpen, Globe, Sparkles } from "lucide-react";

const FACTS = [
  {
    icon: "🌸",
    title: "ریشه‌ی جشن",
    desc: "روز دختر بین‌المللی (International Day of the Girl Child) هر ساله در ۱۱ اکتبر برگزار می‌شود و از سال ۲۰۱۲ توسط سازمان ملل متحد تصویب شده است.",
  },
  {
    icon: "💫",
    title: "هدفِ جشن",
    desc: "افزایش آگاهی درباره‌ی چالش‌هایی که دختران در سراسر جهان با آن مواجه‌اند، و ترویج برابری فرصت‌ها برای رشد و توانمندسازی آن‌ها.",
  },
  {
    icon: "📚",
    title: "آموزش برای همه",
    desc: "هر سال میلیون‌ها دختر در سراسر جهان به دلیل فقر، ازدواج زودهنگام، یا تبعیض از رفتن به مدرسه محروم می‌شوند. این روز یادآور تعهد ما به آموزش برای همه است.",
  },
  {
    icon: "🚀",
    title: "آینده‌سازان",
    desc: "دختران امروز، رهبران، دانشمندان، هنرمندان و مادران فردا هستند. سرمایه‌گذاری روی آن‌ها یعنی سرمایه‌گذاری روی آینده‌ی جهان.",
  },
];

export function HistorySection() {
  return (
    <section className="relative py-24 px-4 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full glass-card text-sm font-medium text-pink-600 dark:text-pink-300">
            <BookOpen className="w-4 h-4" />
            <span>بدانیم و یاد بگیریم</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            <span className="text-gradient-rose">چرا روز دختر؟</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            چند نکته‌ی کوتاه درباره‌ی اهمیت این روز
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FACTS.map((fact, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-3xl p-8 flex gap-5"
            >
              <div className="text-5xl flex-shrink-0">{fact.icon}</div>
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  {fact.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">{fact.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 glass-card rounded-3xl p-8 sm:p-10 text-center bg-gradient-to-br from-pink-500/10 to-amber-400/10"
        >
          <Globe className="w-10 h-10 mx-auto mb-4 text-pink-500" />
          <p className="text-xl sm:text-2xl font-bold leading-relaxed mb-3">
            «دخترانِ امروز، زنانِ فردا و پایه‌گذارانِ نسل‌های آینده‌اند.»
          </p>
          <p className="text-sm text-muted-foreground">
            سازمان ملل متحد
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
