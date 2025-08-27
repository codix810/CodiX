"use client";
import { motion } from "framer-motion";
import {
  Code2,
  Zap,
  ShieldCheck,
  Terminal,
  Cpu,
  Database,
  Cloud,
  GitBranch,
  Globe,
  Server,
} from "lucide-react";
import { useLang } from "./context/LangContext";

// ✅ تعريف Type للترجمة
type HeroTranslation = {
  brand: string;
  desc: string;
  supDesc: string;
  cta: string;
  features: [string, string, string]; // لازم يبقوا 3 عناصر
};

type Translation = {
  title: string;
  hero: HeroTranslation;
};

const icons = [
  { Icon: Code2, color: "text-yellow-400", pos: "top-25 left-20", dur: 13 },
  { Icon: Terminal, color: "text-green-400", pos: "bottom-10 right-24", dur: 7 },
  { Icon: Cpu, color: "text-pink-400", pos: "top-24 right-12", dur: 8 },
  { Icon: Database, color: "text-blue-400", pos: "bottom-20 left-16", dur: 9 },
  { Icon: Cloud, color: "text-cyan-400", pos: "top-32 left-1/3", dur: 10 },
  { Icon: GitBranch, color: "text-red-400", pos: "bottom-32 right-1/3", dur: 12 },
  { Icon: Globe, color: "text-indigo-400", pos: "top-25 right-1/4", dur: 12 },
  { Icon: Server, color: "text-purple-400", pos: "bottom-12 left-1/4", dur: 13 },
];

export default function Hero() {
  const { t } = useLang() as { t: Translation };

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col justify-center items-center 
      bg-gradient-to-br from-violet-800 via-black to-purple-900 
      text-center px-6 overflow-hidden"
    >
      {/* ✨ خلفية إضاءات (Glow Effects) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* إضاءة وردي */}
        <div className="absolute w-80 h-80 bg-pink-500/20 rounded-full blur-3xl bottom-20 right-10 animate-pulse"></div>

        {/* إضاءة بنفسجي */}
        <div className="absolute w-72 h-72 bg-purple-500/30 rounded-full blur-3xl top-20 left-10 animate-pulse"></div>

        {/* إضاءة إضافية أزرق (اختياري للتوازن) */}
        <div className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-2xl top-40 right-1/3 animate-bounce"></div>
      </div>

      {/* ✨ أيقونات برمجة حوالين الهيرو */}
      {icons.map(({Icon , color , pos ,dur},i) => (
        <motion.div
          key={i}
          className={`absolute ${pos}`}
          animate={{ y: [0, -40, 0], rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: dur, ease: "easeInOut" }}
        >
          <Icon size={32} className={color} />
        </motion.div>
      ))}

      {/* 🔥 العنوان */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg leading-tight"
      >
        {t.title}{" "}
        <span className="bg-gradient-to-r from-purple-400 to-purple-800 bg-clip-text text-transparent">
          {t.hero.brand}
        </span>
      </motion.h1>

      {/* 🔥 الوصف */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
      >
        {t.hero.desc}
      </motion.p>

      {/* ✨ المميزات */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.7 }}
        className="mt-10 flex flex-wrap justify-center gap-8 text-gray-200"
      >
        <div className="flex flex-col items-center gap-2 hover:scale-110 transition">
          <Code2 size={42} className="text-purple-400" />
          <span className="text-sm md:text-base">{t.hero.features[0]}</span>
        </div>
        <div className="flex flex-col items-center gap-2 hover:scale-110 transition">
          <Zap size={42} className="text-yellow-400" />
          <span className="text-sm md:text-base">{t.hero.features[1]}</span>
        </div>
        <div className="flex flex-col items-center gap-2 hover:scale-110 transition">
          <ShieldCheck size={42} className="text-green-400" />
          <span className="text-sm md:text-base">{t.hero.features[2]}</span>
        </div>
      </motion.div>

      {/* 🚀 زر CTA */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-12 px-8 py-4 rounded-xl 
         bg-gradient-to-r from-purple-700  to-black 
         text-white font-semibold text-lg shadow-lg hover:shadow-purple-500/50 transition"
      >
        {t.hero.cta}
      </motion.a>
    </section>
  );
}
