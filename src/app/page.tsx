"use client";

import { useState } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

// Harpの「1本の弦」を表現する、再利用可能なコンポーネント
const String = ({ xPos }: { xPos: number }) => {
  const controls = useAnimationControls();

  // 弦を弾くアニメーションを再生する関数
  const playPluckAnimation = () => {
    controls.start({
      d: [
        "M " + xPos + " 0 Q " + xPos + " 130 " + xPos + " 260", // 静止
        "M " + xPos + " 0 Q " + (xPos - 15) + " 130 " + xPos + " 260", // 左にしなる
        "M " + xPos + " 0 Q " + (xPos + 15) + " 130 " + xPos + " 260", // 右に揺れ戻す
        "M " + xPos + " 0 Q " + (xPos - 5) + " 130 " + xPos + " 260", // 小さく揺れ戻す
        "M " + xPos + " 0 Q " + (xPos + 5) + " 130 " + xPos + " 260",
        "M " + xPos + " 0 Q " + xPos + " 130 " + xPos + " 260", // 静止に戻る
      ],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        times: [0, 0.15, 0.3, 0.5, 0.7, 1],
      },
    });
  };

  return (
    <motion.path
      d={`M ${xPos} 0 Q ${xPos} 130 ${xPos} 260`} // 初期状態のパス
      stroke="currentColor"
      strokeWidth="1"
      fill="transparent"
      animate={controls}
      onMouseEnter={playPluckAnimation} // マウスが乗った瞬間にアニメーション再生
    />
  );
};


export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    // ... スプラッシュスクリーン部分は変更なし ...
    return (
      <motion.div
        key="splash"
        className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-black"
        onClick={() => setShowSplash(false)}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image src="/image/splashscrean.jpg" alt="Splash Screen Image" fill className="object-cover" priority />
        <div className="absolute z-10 flex flex-col items-center">
          <Image src="/image/namelogo.png" alt="カネコアヤノ" width={500} height={100} className="h-auto w-auto" />
          <p className="mt-4 animate-pulse text-white">Click to Enter</p>
        </div>
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
        className="container mx-auto p-4"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          
          <Link
            href="/discography"
            className="group flex aspect-square items-center justify-center rounded-lg border border-border bg-surface p-4 shadow-sm"
          >
            {/* 外側の黒い円 (枠の85%) */}
            <div className="flex h-[85%] w-[85%] items-center justify-center rounded-full bg-accent">
              {/* 内側の白い円 (黒い円の85%) */}
              <div className="flex h-[50%] w-[50%] items-center justify-center rounded-full bg-surface">
                {/* 回転する文字 */}
                <span className="font-sans text-xl font-bold text-accent group-hover:animate-spin-slow">
                  Music
                </span>
              </div>
            </div>
          </Link>

          {/* Live, Profileのリンク */}
          <Link href="/live" className="group flex aspect-square items-center justify-center rounded-lg border border-border bg-surface p-4 transition-colors hover:bg-accent hover:text-background">Live</Link>
          <Link href="/profile" className="group flex aspect-square items-center justify-center rounded-lg border border-border bg-surface p-4 transition-colors hover:bg-accent hover:text-background">Profile</Link>
          
          {/* Video要素 */}
          <Link href="/movies" className="group aspect-square flex items-center justify-center overflow-hidden rounded-lg border border-border bg-surface p-4 transition-colors duration-300 hover:bg-accent">
            <div className="flex h-full w-full items-center overflow-hidden rounded-full bg-accent transition-colors duration-300 group-hover:bg-surface">
              <div className="flex w-full -rotate-12 scale-150">
                <div className="animate-marquee flex w-max items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={`movie1-${i}`} className="mx-4 font-sans text-2xl font-bold text-background transition-colors duration-300 group-hover:text-accent">MOVIE</span>
                    ))}
                  </div>
                  <div className="flex items-center" aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                      <span key={`movie2-${i}`} className="mx-4 font-sans text-2xl font-bold text-background transition-colors duration-300 group-hover:text-accent">MOVIE</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
          
          {/* 横長の画像 */}
          <div className="relative overflow-hidden rounded-lg border border-border bg-surface md:col-span-2 md:aspect-video">
             <Image src="/image/homeimg.png" alt="Homepage Image" fill className="object-cover" />
          </div>

          {/* Harp要素 */}
          <div className="flex aspect-square cursor-default items-center justify-center border border-border bg-surface p-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 260" className="h-full">
              {[...Array(6)].map((_, i) => (
                <String key={i} xPos={20 + i * 29} />
              ))}
            </svg>
          </div>
          
          {/* Goods Store */}
          <a href="https://kanekoshouten.jp/" target="_blank" rel="noopener noreferrer" className="group flex aspect-square items-center justify-center gap-2 rounded-lg border border-border bg-surface p-4 transition-colors hover:bg-accent hover:text-background">
            Goods Store <FiExternalLink />
          </a>
        </div>
      </motion.div>
      
      {/* 連携できていないglobals.cssの代わりに、ここでアニメーションを定義 */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </AnimatePresence>
  );
}