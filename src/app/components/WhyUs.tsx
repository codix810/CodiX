"use client";
import { motion } from "framer-motion";
import { Shield, Zap, Users } from "lucide-react";
import { useLang } from "./context/LangContext";

export default function WhyUs() {
  const { t } = useLang();

  const reasons = [
    { icon: <Shield size={40} className="text-purple-400" />, title: t.whyus.items[0].title, desc: t.whyus.items[0].desc },
    { icon: <Zap size={40} className="text-yellow-400" />, title: t.whyus.items[1].title, desc: t.whyus.items[1].desc },
    { icon: <Users size={40} className="text-green-400" />, title: t.whyus.items[2].title, desc: t.whyus.items[2].desc },
  ];

  return (
    <section 
      id="whyus" 
      className="py-20 text-center bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 relative"
    >
      {/* العنوان */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-white mb-12 drop-shadow-lg"
      >
        {t.whyus.title}
      </motion.h2>

      {/* الكروت */}
      <div className="grid md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 group hover:shadow-purple-500/40 transition"
          >
            <div className="flex justify-center">{r.icon}</div>
            <h3 className="text-xl font-semibold mt-4 text-white group-hover:text-purple-300 transition">
              {r.title}
            </h3>
            <p className="mt-2 text-gray-200">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
