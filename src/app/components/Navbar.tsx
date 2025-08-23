"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Home, ShoppingCart, Info, User, Globe } from "lucide-react";
import Link from "next/link";
import { useLang } from "../components/context/LangContext"; // 🟢 استدعاء الكونتكست

// ✅ Types للترجمة
type NavbarTranslation = {
  home: string;
  about: string;
  projects: string;
  contact: string;
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

  const navItems = [
    {
      name: t.navbar.projects,
      icon: <ShoppingCart size={18} />,
      href: "/products",
    },
    { name: t.navbar.contact, icon: <User size={18} />, href: "/account" },
    { name: t.navbar.about, icon: <Info size={18} />, href: "/About" },
    { name: t.navbar.home, icon: <Home size={18} />, href: "/" },
  ];

  const [open, setOpen] = useState<boolean>(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full bg-gradient-to-r
      from-gray-900 via-gray-800 to-purple-900
      backdrop-blur-md shadow-lg z-50"
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* ✅ زرار تغيير اللغة */}
        <button
          onClick={toggleLang}
          className="hidden md:flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition"
        >
          <Globe size={18} />
          {t.navbar.switch}
        </button>

        {/* ✅ العناصر شمال */}
        <ul className="hidden md:flex gap-10 font-medium text-white">
          {navItems.map((item, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.05 }}
              className="relative group flex items-center gap-2 cursor-pointer"
            >
              {item.icon}
              <Link href={item.href}>{item.name}</Link>
              {/* خط تحت العنصر عند الهوفر */}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </motion.li>
          ))}
        </ul>

        {/* ✅ اللوجو يمين */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-extrabold text-white tracking-wide flex items-center gap-2"
        >
          {t.hero.brand}
        </motion.div>

        {/* ✅ زرار الموبايل */}
        <div
          className="md:hidden cursor-pointer text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* ✅ منيو الموبايل */}
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:hidden flex flex-col gap-6 p-6 bg-white/95 backdrop-blur-md shadow-lg"
        >
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            <Globe size={18} />
            {t.navbar.switch}
          </button>

          {navItems.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-lg text-gray-700 hover:text-blue-600 transition"
            >
              {item.icon}
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.nav>
  );
}
