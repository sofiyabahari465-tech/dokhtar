"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Heart, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function MessageSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("لطفاً نام و پیام خود را وارد کنید");
      return;
    }
    toast.success("پیام شما با عشق ثبت شد! ❤️", {
      description: `از طرف ${name}`,
    });
    setName("");
    setMessage("");
  };

  return (
    <section
      id="message"
      className="relative py-24 px-4 z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full glass-card text-sm font-medium text-pink-600 dark:text-pink-300">
            <Send className="w-4 h-4" />
            <span>پیام تبریک</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            <span className="text-gradient-rose">از طرفِ تو</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            پیام تبریک خود را برای دختری که دوستش داری بنویس. کلمات تو می‌توانند
            روزِ او را زیباتر کنند.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card rounded-3xl p-6 sm:p-10 space-y-6"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-pink-500" fill="currentColor" />
              نام شما
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثلاً: دوستِ کوچک"
              className="w-full px-4 py-3 rounded-2xl bg-white/60 dark:bg-black/30 border border-pink-200/50 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300/40 transition-colors text-foreground placeholder:text-muted-foreground/60"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              پیام تبریک شما
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="متن پیام زیبای تو... مثلاً: تبریک می‌گویم که هستی، تبریک می‌گویم که دختری..."
              className="w-full px-4 py-3 rounded-2xl bg-white/60 dark:bg-black/30 border border-pink-200/50 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300/40 transition-colors resize-none text-foreground placeholder:text-muted-foreground/60 leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="relative w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg glow-rose hover:scale-[1.02] transition-transform"
          >
            <Send className="w-5 h-5" />
            <span>ارسالِ با عشق</span>
            <span className="absolute inset-0 rounded-full shimmer pointer-events-none" />
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
          ※ پیام‌ها فقط به‌صورت نمایشی در همین جلسه ذخیره می‌شوند و به سرور ارسال
          نمی‌شوند.
        </p>
      </motion.div>
    </section>
  );
}
