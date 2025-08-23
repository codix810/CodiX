"use client";
import { motion } from "framer-motion";
import { Code2, Zap, ShieldCheck } from "lucide-react";
import { useLang } from "./context/LangContext";

// ✅ تعريف Type للترجمة
type HeroTranslation = {
  brand: string;
  desc: string;
  cta: string;
  features: [string, string, string]; // لازم يبقوا 3 عناصر بالترتيب
};

type Translation = {
  title: string;
  hero: HeroTranslation;
};

export default function Hero() {
  const { t } = useLang() as { t: Translation }; // 🔒 Type-Safe للترجمة

  return (
    <section
      id="home"
      className="h-screen flex flex-col justify-center items-center 
                 bg-gradient-to-br 
                 from-gray-900 via-gray-800 to-purple-900 
                 text-center px-6 relative"
    >
      {/* 🔥 العنوان */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg"
      >
        {t.title} <span className="text-purple-400">{t.hero.brand}</span>
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

      {/* 🔥 أيقونات المميزات */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.7 }}
        className="mt-10 flex gap-8 text-gray-200"
      >
        <div className="flex flex-col items-center gap-2 hover:scale-110 transition">
          <Code2 size={40} className="text-purple-400" />
          <span className="text-sm">{t.hero.features[0]}</span>
        </div>
        <div className="flex flex-col items-center gap-2 hover:scale-110 transition">
          <Zap size={40} className="text-yellow-400" />
          <span className="text-sm">{t.hero.features[1]}</span>
        </div>
        <div className="flex flex-col items-center gap-2 hover:scale-110 transition">
          <ShieldCheck size={40} className="text-green-400" />
          <span className="text-sm">{t.hero.features[2]}</span>
        </div>
      </motion.div>

      {/* 🔥 زر CTA */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-12 px-8 py-4 rounded-xl 
                   bg-gradient-to-r from-purple-700 to-purple-500 
                   text-white font-semibold text-lg shadow-lg hover:shadow-purple-500/50 transition"
      >
        {t.hero.cta}
      </motion.a>
    </section>
  );
}
