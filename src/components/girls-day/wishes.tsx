"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, Heart, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Wish {
  id: number;
  text: string;
  author: string;
  color: string;
  ts: number;
}

const COLORS = [
  "from-pink-400 to-rose-400",
  "from-amber-300 to-pink-400",
  "from-violet-400 to-pink-400",
  "from-rose-400 to-amber-300",
  "from-fuchsia-400 to-pink-500",
  "from-pink-300 to-violet-400",
];

const SAMPLE_WISHES: Wish[] = [
  {
    id: 1,
    text: "آرزو می‌کنم روزی فرا برسد که هر دخترِ دنیا، آزادانه به مدرسه برود و آرزوهایش را دنبال کند.",
    author: "ناشناس",
    color: COLORS[0],
    ts: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: 2,
    text: "برای تمام دخترانی که در سکوت مبارزه می‌کنند — صدای شما شنیده خواهد شد.",
    author: "دوست‌دارِ تو",
    color: COLORS[1],
    ts: Date.now() - 1000 * 60 * 60 * 12,
  },
  {
    id: 3,
    text: "آرزو می‌کنم که لبخندِ دختری، جنگی را تمام کند.",
    author: "رویا",
    color: COLORS[2],
    ts: Date.now() - 1000 * 60 * 60 * 3,
  },
];

const STORAGE_KEY = "girls-day-wishes";

export function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setWishes(JSON.parse(stored));
      } else {
        setWishes(SAMPLE_WISHES);
      }
    } catch {
      setWishes(SAMPLE_WISHES);
    }
  }, []);

  const persist = (next: Wish[]) => {
    setWishes(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 5) {
      toast.error("آرزویت رو کامل بنویس (حداقل ۵ کاراکتر)");
      return;
    }
    const newWish: Wish = {
      id: Date.now(),
      text: text.trim(),
      author: author.trim() || "ناشناس",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      ts: Date.now(),
    };
    persist([newWish, ...wishes]);
    setText("");
    setAuthor("");
    toast.success("آرزویت به آسمان رفت! 🌟", {
      description: "شاید روزی برآورده شود",
    });
  };

  const timeAgo = (ts: number) => {
    const diff = Date.now() - ts;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "همین الان";
    if (minutes < 60) return `${minutes} دقیقه پیش`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ساعت پیش`;
    return `${Math.floor(hours / 24)} روز پیش`;
  };

  return (
    <section className="relative py-24 px-4 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full glass-card text-sm font-medium text-pink-600 dark:text-pink-300">
            <Star className="w-4 h-4" />
            <span>ستاره‌ی آرزوها</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            <span className="text-gradient-rose">آرزوهای دیجیتال</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            آرزویت را بنویس و بفرست به آسمان. شاید روزی، ستاره‌ای آن را
            برآورده کند
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="glass-card rounded-3xl p-6 sm:p-8 mb-8 space-y-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80 flex items-center gap-1.5">
              <Heart
                className="w-4 h-4 text-pink-500"
                fill="currentColor"
              />
              آرزویت را بنویس
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              maxLength={200}
              placeholder="آرزوی زیبای تو... مثلاً: آرزو می‌کنم روزی فرا برسد که..."
              className="w-full px-4 py-3 rounded-2xl bg-white/60 dark:bg-black/30 border border-pink-200/50 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300/40 transition-colors resize-none text-foreground placeholder:text-muted-foreground/60 leading-relaxed"
            />
            <div className="flex justify-end">
              <span className="text-xs text-muted-foreground">
                {text.length} / 200
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              maxLength={30}
              placeholder="نام (اختیاری)"
              className="sm:flex-1 px-4 py-3 rounded-2xl bg-white/60 dark:bg-black/30 border border-pink-200/50 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300/40 transition-colors text-foreground placeholder:text-muted-foreground/60"
            />
            <button
              type="submit"
              className="relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg glow-rose hover:scale-[1.02] transition-transform"
            >
              <Send className="w-5 h-5" />
              <span>فرستادن به آسمان</span>
              <span className="absolute inset-0 rounded-2xl shimmer pointer-events-none" />
            </button>
          </div>
        </form>

        {/* Wishes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {wishes.map((wish) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 100 }}
                layout
                className="relative glass-card rounded-3xl p-5 overflow-hidden"
              >
                {/* Star icon */}
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${wish.color} flex items-center justify-center shadow-md`}
                  >
                    <Star
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {timeAgo(wish.ts)}
                  </span>
                </div>

                {/* Wish text */}
                <p className="text-sm leading-relaxed text-foreground/90 mb-4 min-h-[4rem]">
                  {wish.text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-medium">{wish.author}</span>
                </div>

                {/* Decorative glow */}
                <div
                  className={`absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-br ${wish.color} opacity-10 blur-2xl`}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
          ※ آرزوها به‌صورت محلی در مرورگر شما ذخیره می‌شوند و فقط شما می‌توانید
          آن‌ها را ببینید
        </p>
      </motion.div>
    </section>
  );
}
