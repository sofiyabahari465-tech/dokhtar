"use client";

import { Heart, Github, Sparkles, Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-auto py-12 px-4 z-10 border-t border-pink-200/40 dark:border-pink-900/30 bg-gradient-to-b from-transparent to-pink-50/40 dark:to-pink-950/20">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        {/* Decorative hearts */}
        <div className="flex items-center justify-center gap-2 mb-2">
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              className="w-4 h-4 text-pink-400 animate-pulse-rose"
              fill="currentColor"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        <h3 className="text-2xl font-bold">
          <span className="text-gradient-rose">ساخته‌شده با عشق</span>
        </h3>

        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          این پروژه با React، Next.js 16، TypeScript، Tailwind CSS، و Framer Motion
          ساخته شده است. یک هدیه‌ی دیجیتال برای تمام دخترانِ زیبای دنیا. 🌸
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"].map(
            (tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-xs font-medium text-pink-700 dark:text-pink-300"
              >
                <Code2 className="w-3 h-3" />
                {tech}
              </span>
            )
          )}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-medium shadow-lg hover:scale-105 transition-transform"
          >
            <Github className="w-4 h-4" />
            <span>مشاهده در GitHub</span>
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-sm font-medium text-pink-700 dark:text-pink-300 hover:scale-105 transition-transform"
          >
            <Sparkles className="w-4 h-4" />
            <span>بازگشت به بالا</span>
          </button>
        </div>

        <div className="pt-6 border-t border-pink-200/30 dark:border-pink-900/20 text-xs text-muted-foreground">
          <p className="flex items-center justify-center gap-1.5">
            <span>© ۱۴۰۵ • ساخته‌شده با</span>
            <Heart
              className="w-3.5 h-3.5 text-pink-500 animate-heart-beat"
              fill="currentColor"
            />
            <span>برای روز دختر</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
