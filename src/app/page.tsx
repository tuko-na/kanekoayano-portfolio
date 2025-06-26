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
      className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-black"
      onClick={() => setShowSplash(false)}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Image
        src="/image/splashscrean.jpg" // "splash.jpg" から "splashscrean.jpg" に変更
        alt="Splash Screen Image"
        fill
        className="object-cover"
        priority
      />
      <div className="relative z-10">
        <Image src="/image/namelogo.png" alt="カネコアヤノ" width={500} height={100} className="h-auto w-auto" />
      </div>
      <p className="relative z-10 mt-4 animate-pulse text-white">Click to Enter</p>
    </motion.div>
    );
  }

  // --- メインコンテンツ（変更なし） ---
  return (
    <AnimatePresence>
      <motion.div
        key="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto p-4"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Link href="/discography" className="group flex aspect-square items-center justify-center border border-accent-1 bg-white p-4 transition-colors hover:bg-accent-2 hover:text-white">Music</Link>
          <Link href="/live" className="group flex aspect-square items-center justify-center border border-accent-1 bg-white p-4 transition-colors hover:bg-accent-2 hover:text-white">Live</Link>
          <Link href="/profile" className="group flex aspect-square items-center justify-center border border-accent-1 bg-white p-4 transition-colors hover:bg-accent-2 hover:text-white">Profile</Link>
          <Link href="/movies" className="group aspect-square flex items-center justify-center overflow-hidden border border-accent-1 bg-white p-4 transition-colors duration-300 hover:bg-accent-2">
            {/* 円の背景色と、ホバー時の色を指定 */}
            <div className="flex h-full w-full items-center overflow-hidden rounded-full bg-accent-2 transition-colors duration-300 group-hover:bg-white">
              <div className="flex w-full -rotate-12 scale-150">
                <div className="animate-marquee-inner flex w-max items-center">
                  <div className="flex w-max items-center">
                    {/* テキストの色と、ホバー時の色を指定 */}
                    {[...Array(4)].map((_, i) => (
                      <span key={`video1-${i}`} className="mx-8 font-sans text-2xl font-bold text-white transition-colors duration-300 group-hover:text-accent-2">VIDEO</span>
                    ))}
                  </div>
                  <div className="flex w-max items-center" aria-hidden="true">
                    {[...Array(4)].map((_, i) => (
                      <span key={`video2-${i}`} className="mx-8 font-sans text-2xl font-bold text-white transition-colors duration-300 group-hover:text-accent-2">VIDEO</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="relative border border-accent-1 bg-white md:col-span-2 md:aspect-video">
            <Image src="/image/homeimg.png" alt="Homepage Image" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="flex aspect-square items-center justify-center border border-accent-1 bg-white p-4">Harp</div>
          <a href="https://kanekoshouten.jp/" target="_blank" rel="noopener noreferrer" className="group flex aspect-square items-center justify-center gap-2 border border-accent-1 bg-white p-4 transition-colors hover:bg-accent-2 hover:text-white">
            Goods Store <FiExternalLink />
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}