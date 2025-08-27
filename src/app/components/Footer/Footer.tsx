"use client";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import { useLang } from "../../components/context/LangContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-gradient-to-tl
      from-violet-950 via-black to-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* شعار / CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h2 className="text-2xl md:text-3xl font-bold">{t.Footer.cta}</h2>
          <p className="mt-2 text-gray-300 text-sm">{t.Footer.subtitle}</p>
        </motion.div>

        {/* أيقونات التواصل */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex gap-4 text-white"
        >
          <a href="#" className="hover:text-purple-400 transition"><Facebook size={24} /></a>
          <a href="#" className="hover:text-purple-400 transition"><Twitter size={24} /></a>
          <a href="#" className="hover:text-purple-400 transition"><Instagram size={24} /></a>
          <a href="#" className="hover:text-purple-400 transition"><Github size={24} /></a>
        </motion.div>
      </div>

      {/* الحقوق */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-10 text-center text-gray-400 text-sm"
      >
        {t.Footer.rights}
      </motion.div>
    </footer>
  );
}
