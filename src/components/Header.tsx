"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-between bg-background/70 px-4 backdrop-blur-sm sm:px-8">
        {/* === メインのサイトロゴ === */}
        <Link href="/">
          <Image
            src="/image/namelogo.png"
            alt="カネコアヤノ Site Logo"
            width={160}
            height={40}
            priority
          />
        </Link>
        
        {/* ハンバーガーボタン */}
        <button
          onClick={toggleMenu}
          className="relative z-50 flex h-12 w-12 flex-col items-center justify-center space-y-2 rounded-md p-2"
        >
          <div className={`absolute flex h-full w-full items-center justify-center transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
            <span className="absolute block h-0.5 w-8 rotate-45 bg-foreground"></span>
            <span className="absolute block h-0.5 w-8 -rotate-45 bg-foreground"></span>
          </div>
          <div className={`flex h-full w-full flex-col items-center justify-center space-y-2 transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}>
            <span className="block h-0.5 w-8 bg-foreground"></span>
            <span className="block h-0.5 w-8 bg-foreground"></span>
            <span className="block h-0.5 w-8 bg-foreground"></span>
          </div>
        </button>
      </header>

      {/* 背景オーバーレイ */}
      <div
        className={`fixed inset-0 bg-black/30 z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMenu}
      ></div>

      {/* メニューパネル */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-background shadow-xl z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "transform translate-x-0" : "transform translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-8 pt-20 h-full">
          {/* === メニューパネル内のロゴ === */}
          <div className="mb-12">
            <Link href="/" onClick={toggleMenu}>
              <Image
                src="/image/hamburger_logo.png"
                alt="Logo"
                width={80}
                height={30}
                className="h-[30px] w-auto shrink-0 object-contain"
              />
            </Link>
          </div>
          <ul className="space-y-8 text-left text-2xl">
            <li><Link href="/" onClick={toggleMenu} className="hover:underline">HOME</Link></li>
            <li><Link href="/discography" onClick={toggleMenu} className="hover:underline">DISCOGRAPHY</Link></li>
            <li><Link href="/profile" onClick={toggleMenu} className="hover:underline">PROFILE</Link></li>
            <li><Link href="/movies" onClick={toggleMenu} className="hover:underline">MOVIES</Link></li>
            <li><a href="https://kanekoshouten.jp/" target="_blank" rel="noopener noreferrer" className="hover:underline">GOODS</a></li>
          </ul>
        </nav>
      </div>
    </>
  );
};