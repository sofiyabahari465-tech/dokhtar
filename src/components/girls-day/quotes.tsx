"use client";

import { motion } from "framer-motion";
import { Quote, Heart } from "lucide-react";

const QUOTES = [
  {
    text: "دختران، گل‌های آفرینش‌اند؛ هر کدام با عطرِ خاص خود، جهان را خوش‌بو می‌کنند.",
    author: "نویسنده‌ی ناشناس",
    color: "from-pink-400 to-rose-400",
  },
  {
    text: "یک دخترِ با اراده می‌تواند تمام دنیا را تغییر دهد؛ زیرا او آینده را در دست‌های خود می‌سازد.",
    author: "ملالا یوسف‌زی",
    color: "from-amber-400 to-pink-400",
  },
  {
    text: "زیباییِ یک دختر نه در لباس‌هایی که می‌پوشد، بلکه در نگاهی است که جهان را می‌بیند.",
    author: "گابریل شANEL",
    color: "from-rose-400 to-fuchsia-400",
  },
  {
    text: "دختر بودن یعنی شجاعتِ ماندن، حتی وقتی همه‌چیز می‌گوید فرار کن.",
    author: "نویسنده‌ی ناشناس",
    color: "from-pink-500 to-orange-400",
  },
  {
    text: "هر دختر یک ستاره‌ست؛ بعضی‌ها در روز می‌درخشند و بعضی‌ها در شب، اما هیچ‌کدام تاریکی را برنمی‌تابند.",
    author: "نویسنده‌ی ناشناس",
    color: "from-violet-400 to-pink-400",
  },
  {
    text: "دختری که می‌خواند، دختری که می‌نویسد، دختری که می‌آفریند — او جهانِ فردا را می‌سازد.",
    author: "نویسنده‌ی ناشناس",
    color: "from-fuchsia-400 to-amber-400",
  },
];

export function Quotes() {
  return (
    <section id="quotes" className="relative py-24 px-4 z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full glass-card text-sm font-medium text-pink-600 dark:text-pink-300">
            <Quote className="w-4 h-4" />
            <span>کلماتی از قلب</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            <span className="text-gradient-rose">نقل قول‌های الهام‌بخش</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            جملاتی از زنان بزرگ و نویسندگان، در ستایشِ روحِ زنانه و قدرتِ دختران
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUOTES.map((quote, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative glass-card rounded-3xl p-8 overflow-hidden"
            >
              {/* Decorative gradient */}
              <div
                className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${quote.color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`}
              />

              <Quote className="w-10 h-10 text-pink-400/40 mb-4" />

              <p className="text-lg leading-relaxed text-foreground/90 mb-6 relative z-10">
                {quote.text}
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart
                  className="w-4 h-4 text-pink-500"
                  fill="currentColor"
                />
                <span className="font-medium">{quote.author}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
