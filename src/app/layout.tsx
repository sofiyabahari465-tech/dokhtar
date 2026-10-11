import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "روز دختر | تجلیل از فرشته‌های زمینی",
  description:
    "یک تجربه‌ی دیجیتال زیبا و احساسی برای بزرگداشت روز دختر. تبریک، نقل قول‌های الهام‌بخش، کیک و شمع، و افکت‌های جادویی. ساخته‌شده با React و Next.js.",
  keywords: [
    "روز دختر",
    "Girl's Day",
    "تبریک روز دختر",
    "Next.js",
    "React",
    "Vazirmatn",
  ],
  authors: [{ name: "Made with love" }],
  openGraph: {
    title: "روز دختر | تجلیل از فرشته‌های زمینی",
    description:
      "یک تجربه‌ی دیجیتال زیبا برای بزرگداشت روز دختر با افکت‌های جادویی و نقل قول‌های الهام‌بخش.",
    type: "website",
    locale: "fa_IR",
  },
  twitter: {
    card: "summary_large_image",
    title: "روز دختر | تجلیل از فرشته‌های زمینی",
    description:
      "یک تجربه‌ی دیجیتال زیبا برای بزرگداشت روز دختر با افکت‌های جادویی.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ff6b9d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
