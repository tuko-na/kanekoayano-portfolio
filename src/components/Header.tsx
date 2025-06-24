"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

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
      {/* ハンバーガーボタン */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-2 space-y-2 bg-white/70 backdrop-blur-sm rounded-md"
      >
        <span
          className={`block w-8 h-0.5 bg-black transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-2.5" : ""
          }`}
        ></span>
        <span
          className={`block w-8 h-0.5 bg-black transition-opacity duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-8 h-0.5 bg-black transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2.5" : ""
          }`}
        ></span>
      </button>

      {/* 背景のオーバーレイ */}
      <div
        className={`fixed inset-0 bg-black/30 z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMenu}
      ></div>

      {/* メニューパネル本体 */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-xl z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "transform translate-x-0" : "transform translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-8 pt-24 h-full">
          <ul className="text-left text-2xl space-y-8">
            <li>
              <Link href="/" onClick={toggleMenu} className="hover:underline">HOME</Link>
            </li>
            <li>
              <Link href="/discography" onClick={toggleMenu} className="hover:underline">DISCOGRAPHY</Link>
            </li>
            <li>
              <Link href="/profile" onClick={toggleMenu} className="hover:underline">PROFILE</Link>
            </li>
            <li>
              <Link href="/movies" onClick={toggleMenu} className="hover:underline">MOVIES</Link>
            </li>
            <li>
              <a
                href="https://kanekoshouten.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                GOODS
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};