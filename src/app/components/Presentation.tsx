"use client";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Headphones,
  BadgeCheck,
  Wrench,
  Gem,
  DollarSign,
} from "lucide-react";
import { useLang } from "../components/context/LangContext";
import { ReactNode } from "react";

// ✅ Types للترجمة
type PresentationItem = {
  title: string;
  desc: string;
};

type PresentationTranslation = {
  title: string;
  items: PresentationItem[];
};

type Translation = {
  presentation: PresentationTranslation;
};

export default function Presentation() {
  const { t } = useLang() as { t: Translation };

  // ✅ تعريف features مع Type
  const features: { icon: ReactNode; title: string; desc: string }[] = [
    {
      icon: <Wrench size={40} className="text-purple-400" />,
      title: t.presentation.items[0].title,
      desc: t.presentation.items[0].desc,
    },
    {
      icon: <Gem size={40} className="text-blue-400" />,
      title: t.presentation.items[1].title,
      desc: t.presentation.items[1].desc,
    },
    {
      icon: <ShieldCheck size={40} className="text-green-400" />,
      title: t.presentation.items[2].title,
      desc: t.presentation.items[2].desc,
    },
    {
      icon: <Headphones size={40} className="text-yellow-400" />,
      title: t.presentation.items[3].title,
      desc: t.presentation.items[3].desc,
    },
    {
      icon: <DollarSign size={40} className="text-pink-400" />,
      title: t.presentation.items[4].title,
      desc: t.presentation.items[4].desc,
    },
    {
      icon: <BadgeCheck size={40} className="text-indigo-400" />,
      title: t.presentation.items[5].title,
      desc: t.presentation.items[5].desc,
    },
  ];

  return (
    <section
      id="presentation"
      className="py-20 bg-gradient-to-tl
      from-violet-950 via-black to-purple-950 text-center relative"
    >
      {/* ✅ العنوان */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-white mb-8 drop-shadow-lg"
      >
        {t.presentation.title}
      </motion.h2>

      {/* ✅ الكروت */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 group hover:shadow-purple-500/40 transition"
          >
            <div className="flex justify-center">{f.icon}</div>
            <h3 className="text-xl font-semibold mt-4 text-white group-hover:text-purple-300 transition">
              {f.title}
            </h3>
            <p className="mt-2 text-gray-300">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
