"use client";

import { Navbar } from "@/components/girls-day/navbar";
import { Hero } from "@/components/girls-day/hero";
import { FloatingElements } from "@/components/girls-day/floating-elements";
import { Fireworks } from "@/components/girls-day/fireworks";
import { CountdownSection } from "@/components/girls-day/countdown";
import { CakeSection } from "@/components/girls-day/cake";
import { Quotes } from "@/components/girls-day/quotes";
import { GallerySection } from "@/components/girls-day/gallery";
import { MusicPlayer } from "@/components/girls-day/music-player";
import { GreetingCards } from "@/components/girls-day/greeting-cards";
import { WishesSection } from "@/components/girls-day/wishes";
import { QuizSection } from "@/components/girls-day/quiz";
import { MessageSection } from "@/components/girls-day/message-section";
import { HistorySection } from "@/components/girls-day/history-section";
import { Footer } from "@/components/girls-day/footer";

export default function Home() {
  return (
    <div id="top" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 dark:from-pink-950/40 dark:via-rose-950/30 dark:to-amber-950/40" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-pink-300/20 blur-[120px] animate-pulse-rose" />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-amber-300/20 blur-[120px] animate-pulse-rose"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-rose-300/10 blur-[100px] animate-pulse-rose"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Effects */}
      <FloatingElements />
      <Fireworks />

      {/* Main content */}
      <div className="relative flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <CountdownSection />
          <CakeSection />
          <Quotes />
          <GallerySection />
          <MusicPlayer />
          <GreetingCards />
          <WishesSection />
          <QuizSection />
          <MessageSection />
          <HistorySection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
