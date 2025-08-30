"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Home, Info, Globe } from "lucide-react";
import { Code2, Lightbulb, FolderKanban, PhoneCall } from "lucide-react";
import Link from "next/link";
import { useLang } from "../components/context/LangContext";

type NavbarTranslation = {

  programming: string;
  solving: string;
  projects: string;
  contact: string;
  home: string;
  about: string;
  switch: string;
};

type HeroTranslation = {
  brand: string;
};

type Translation = {
  navbar: NavbarTranslation;
  hero: HeroTranslation;
};

export default function Navbar() {
  const { lang, toggleLang, t } = useLang() as {
    lang: string;
    toggleLang: () => void;
    t: Translation;
  };

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang && storedLang !== lang) {
      toggleLang();
    }
  }, []);

  const navItems = [
    { name: t.navbar.contact, icon: <PhoneCall size={18} />, href: "/account" },
    { name: t.navbar.programming, icon: <Code2 size={18} />, href: "/programming" },
    { name: t.navbar.solving, icon: <Lightbulb size={18} />, href: "/solutions" },
    { name: t.navbar.projects, icon: <FolderKanban size={18} />, href: "/products" },
    { name: t.navbar.about, icon: <Info size={18} />, href: "/About" },
    { name: t.navbar.home, icon: <Home size={18} />, href: "/" },
  ];

  const [open, setOpen] = useState<boolean>(false);

  const handleItemClick = () => {
    setOpen(false); // يقفل القائمة لما يضغط على عنصر
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full bg-gradient-to-tl from-violet-950 via-black to-purple-950 backdrop-blur-md shadow-lg z-50"
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              toggleLang();
              localStorage.setItem("lang", lang === "en" ? "ar" : "en");
            }}
            className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition"
          >
            <Globe size={18} />
            {t.navbar.switch}
          </button>

          <div
            className="cursor-pointer text-white p-2 rounded-lg hover:bg-white/20 transition min-[1051px]:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>

        <ul className="hidden min-[1051px]:flex gap-8 font-medium text-white items-center">
          {navItems.map((item, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.05 }}
              className="relative group flex items-center gap-2 cursor-pointer"
            >
              {item.icon}
              <Link href={item.href}>{item.name}</Link>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </motion.li>
          ))}
        </ul>

        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-[1051px]:hidden flex flex-col gap-4 p-6 bg-white/95 backdrop-blur-md shadow-lg mt-2 rounded-lg absolute right-6 top-16"
          >
            {navItems.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-lg text-gray-700 hover:text-blue-600 transition cursor-pointer"
                onClick={handleItemClick}
              >
                {item.icon}
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </motion.ul>
        )}

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-extrabold text-white tracking-wide"
        >
          CodiX
        </motion.div>
      </div>
    </motion.nav>
  );
}
