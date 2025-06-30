"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <motion.div
        key="splash"
        className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-primary"
        onClick={() => setShowSplash(false)}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/image/splashscrean.jpg"
          alt="Splash Screen Image"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="relative z-10">
          <Image src="/image/namelogo.png" alt="カネコアヤノ" width={500} height={100} className="h-auto w-auto" />
        </div>
        <p className="relative z-10 mt-4 animate-pulse text-white">Click to Enter</p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto p-6 bg-background text-foreground"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/** リンクカード共通スタイル */}
          {[
            { href: "/live", label: "Live" },
            { href: "/profile", label: "Profile" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="group flex aspect-square items-center justify-center rounded-lg border border-accent-1 bg-white text-foreground shadow-sm transition-colors hover:bg-accent-2 hover:text-white"
            >
              {label}
            </Link>
          ))}

          <Link
            href="/discography"
            className="group flex aspect-square items-center justify-center rounded-lg border border-accent-1 bg-white text-foreground shadow-sm transition-colors hover:border-transparent"
          >
            {/* 1. 枠の85%の黒い丸 */}
            <div className="flex h-[85%] w-[85%] items-center justify-center rounded-full bg-accent transition-colors">
              {/* 2. その中に、さらに85%の大きさの白い丸 */}
              <div className="flex h-[40%] w-[40%] items-center justify-center rounded-full bg-white">
                {/* 3. 白い丸の中にMusicの文字を配置 */}
                <span
                  className="font-sans text-xl font-bold text-accent transition-transform duration-500 group-hover:rotate-360"
                  style={{
                    display: 'inline-block',
                    transition: 'transform 1s',
                  }}
                >
                  Music
                </span>
              </div>
            </div>
          </Link>

          {/* Movie用の円形リンクカード */}
          <Link href="/movies" className="group flex aspect-square items-center justify-center border border-border bg-surface p-4">
            <div className="h-[85%] w-[85%] rounded-full bg-accent"></div>
          </Link>

          {/** メイン画像 */}
          <div className="relative overflow-hidden rounded-lg border border-accent-1 bg-white md:col-span-2 md:aspect-video shadow-sm">
            <Image
              src="/image/homeimg.png"
              alt="Homepage Image"
              fill
              className="object-cover"
            />
          </div>

          {/** Harp 枠 */}
          <div className="flex aspect-square items-center justify-center rounded-lg border border-accent-1 bg-white text-foreground shadow-sm">
            Harp
          </div>

          {/** 外部リンク */}
          <a
            href="https://kanekoshouten.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex aspect-square items-center justify-center gap-2 rounded-lg border border-accent-1 bg-white text-foreground shadow-sm transition-colors hover:bg-accent-2 hover:text-white"
          >
            Goods Store <FiExternalLink />
          </a>
        </div>

        {/* 追加: 回転アニメーションのkeyframesをstyleタグで直書き */}
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

.group:hover .group-hover\\:rotate-360 {
  transform: rotate(360deg);
}
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
