"use client"; // クライアントコンポーネントとして宣言

import { useState, useEffect } from "react";
import { client } from "@/libs/client";
import Link from "next/link";
import Image from "next/image";

// --- 型定義 ---
type JacketImage = {
  url: string;
  height: number;
  width: number;
};

type Discography = {
  id: string;
  title: string;
  slug: string;
  jacketImage: JacketImage;
  category: string[];
};

export default function DiscographyPage() {
  // --- State管理 ---
  const [allItems, setAllItems] = useState<Discography[]>([]);
  const [filteredItems, setFilteredItems] = useState<Discography[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // カテゴリのリスト
  const categories = ["ALL", "アルバム", "シングル", "デジタルシングル", "その他"];

  // --- データ取得 ---
  useEffect(() => {
    // ページが読み込まれた時に一度だけデータを取得
    const fetchData = async () => {
      const data = await client.getAllContents({
        endpoint: "discographies",
        queries: { orders: "-releaseDate" },
      });
      setAllItems(data);
      setFilteredItems(data); // 初期表示は全アイテム
    };
    fetchData();
  }, []);

  // --- フィルタリング処理 ---
  useEffect(() => {
    if (selectedCategory === "ALL") {
      setFilteredItems(allItems);
    } else {
      const filtered = allItems.filter(item => 
        item.category.includes(selectedCategory)
      );
      setFilteredItems(filtered);
    }
  }, [selectedCategory, allItems]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Discography</h1>

      {/* --- カテゴリフィルターボタン --- */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 border-b border-border pb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`text-lg transition-colors ${
              selectedCategory === category
                ? "text-foreground font-bold underline underline-offset-4"
                //? "text-foreground font-bold"
                : "text-gray-400 hover:text-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* --- ディスコグラフィー一覧グリッド --- */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {filteredItems.map((album) => (
          <li key={album.id}>
            <Link href={`/discography/${album.slug}`}>
              <Image
                src={album.jacketImage.url}
                alt={`${album.title}のジャケット写真`}
                width={500}
                height={500}
                className="w-full h-auto object-cover aspect-square shadow-md hover:opacity-80 transition-opacity"
              />
              <p className="mt-2 text-center text-sm">{album.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}