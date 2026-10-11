"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, X, ChevronLeft, ChevronRight, Heart } from "lucide-react";

interface GalleryItem {
  src: string;
  title: string;
  desc: string;
}

const ITEMS: GalleryItem[] = [
  {
    src: "images/gallery/blooming-girl.svg",
    title: "دخترِ شکوفا",
    desc: "مانند گلِ بهاری، در زیباییِ خود شکوفا می‌شود و جهان را رنگ می‌دهد.",
  },
  {
    src: "images/gallery/moon-princess.svg",
    title: "شاهزاده‌ی ماه",
    desc: "در شب‌های تاریک، نورِ وجودش راه را به دیگران نشان می‌دهد.",
  },
  {
    src: "images/gallery/sunrise-warrior.svg",
    title: "جنگجوی طلوع",
    desc: "با شجاعت، هر طلوعِ آفتاب را به پیروزیِ تازه‌ای تبدیل می‌کند.",
  },
  {
    src: "images/gallery/butterfly-dreamer.svg",
    title: "رویای پروانه",
    desc: "آرزوهایش بال می‌گشایند و پرواز می‌کنند به سوی آسمانِ بی‌انتها.",
  },
  {
    src: "images/gallery/rose-garden.svg",
    title: "باغِ گل‌ها",
    desc: "هر دختر، گلی است با عطرِ منحصر‌به‌فرد در باغِ آفرینش.",
  },
  {
    src: "images/gallery/star-weaver.svg",
    title: "بافنده‌ی ستارگان",
    desc: "آینده را با دستانِ مهربانش می‌سازد و امید را می‌بافد.",
  },
];

export function GallerySection() {
  const [active, setActive] = useState<number | null>(null);

  const next = () =>
    setActive((cur) => (cur === null ? 0 : (cur + 1) % ITEMS.length));
  const prev = () =>
    setActive((cur) =>
      cur === null ? ITEMS.length - 1 : (cur - 1 + ITEMS.length) % ITEMS.length
    );

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
            <ImageIcon className="w-4 h-4" />
            <span>گالریِ تصاویر</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            <span className="text-gradient-rose">دخترانِ درخشان</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            شش پرتره‌ی هنری از روح‌های زنانه‌ی متفاوت — هر کدام، داستانی برای
            گفتن دارند
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {ITEMS.map((item, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -8, scale: 1.03 }}
              onClick={() => setActive(idx)}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl glass-card cursor-pointer text-right"
            >
              <img
                src={item.src}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white">
                <h3 className="text-lg sm:text-xl font-bold mb-1 flex items-center gap-1.5">
                  <Heart
                    className="w-4 h-4 text-pink-300"
                    fill="currentColor"
                  />
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm opacity-90 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/10 transition-colors" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-white/95 dark:bg-gray-900/95 rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                aria-label="بستن"
              >
                <X className="w-5 h-5" />
              </button>

              <button
                onClick={prev}
                className="absolute top-1/2 right-4 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                aria-label="قبلی"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={next}
                className="absolute top-1/2 left-4 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                aria-label="بعدی"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="grid sm:grid-cols-2 gap-0">
                <div className="aspect-square">
                  <img
                    src={ITEMS[active].src}
                    alt={ITEMS[active].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 text-xs font-medium self-start">
                    <Heart className="w-3 h-3" fill="currentColor" />
                    پرتره‌ی شماره {active + 1}
                  </div>
                  <h3 className="text-3xl font-black mb-4 text-gradient-rose">
                    {ITEMS[active].title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed text-base">
                    {ITEMS[active].desc}
                  </p>
                  <div className="mt-6 text-sm text-muted-foreground">
                    {active + 1} / {ITEMS.length}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
