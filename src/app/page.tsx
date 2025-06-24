"use client"; // アニメーションのためにクライアントコンポーネントにする

import { useState } from "react";
// 今後アニメーションで使うのでFramer Motionもインポートしておきます
import { motion, AnimatePresence } from "framer-motion";

// 各要素のプレースホルダーコンポーネント
const ElementBox = ({ title, className = "" }: { title: string, className?: string }) => (
  <div className={`flex items-center justify-center aspect-square bg-gray-100 border border-gray-300 ${className}`}>
    <p className="text-gray-500">{title}</p>
  </div>
);

export default function Home() {
  const [isEntered, setIsEntered] = useState(false);

  // ここではスプラッシュスクリーンはまだ実装せず、メインのグリッドレイアウトのみ作成します
  // TODO: isEnteredの状態を使ってスプラッシュスクリーンを後で実装

  return (
    <div className="container mx-auto p-4">
      {/* グリッドの定義: 
        - 通常(スマホ)は1列 (grid-cols-1)
        - mediumサイズ(PCなど)以上では4列 (md:grid-cols-4)
        - 要素間の隙間は4 (gap-4)
      */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* --- 上段 --- */}
        <ElementBox title="Music" />
        <ElementBox title="Live" />
        <ElementBox title="Profile" />
        <ElementBox title="Video" />

        {/* --- 下段 --- */}
        {/* 横長の画像 (PCでは2列分の幅を取る) */}
        <ElementBox title="横長の画像" className="md:col-span-2 md:aspect-video" />
        <ElementBox title="Harp" />
        <ElementBox title="Goods Store" />
      </div>
    </div>
  );
}