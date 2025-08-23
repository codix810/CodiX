"use client";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useLang } from "../components/context/LangContext";

// ✅ Types للترجمة
type ProjectItem = {
  title: string;
  desc: string;
};

type ProjectsTranslation = {
  title: string;
  desc: string;
  cta: string;
  latest: ProjectItem[];
  topRated: ProjectItem[];
};

type Translation = {
  projects: ProjectsTranslation;
};

export default function Projects() {
  const { t } = useLang() as { t: Translation }; // 🔒 Type-safe translation

  // ✅ جلب البيانات من ملف الترجمة + إضافة الصور
  const latestProjects = t.projects.latest.map((p, i) => ({
    ...p,
    img: [
      "https://source.unsplash.com/1600x800/?ecommerce,website",
      "https://source.unsplash.com/1600x800/?office,company",
      "https://source.unsplash.com/1600x800/?dashboard,analytics",
    ][i],
  }));

  const topRatedProjects = t.projects.topRated.map((p, i) => ({
    ...p,
    img: [
      "https://source.unsplash.com/600x400/?landingpage,website",
      "https://source.unsplash.com/600x400/?portfolio,developer",
      "https://source.unsplash.com/600x400/?mobile,app",
    ][i],
  }));

  return (
    <section
      id="projects"
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900"
    >
      {/* 🔥 سويبر كبير */}
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-[80vh]"
      >
        {latestProjects.map((p, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-[80vh]">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-6">
                <motion.h2
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg"
                >
                  {p.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="mt-4 text-lg md:text-2xl text-gray-200 max-w-2xl"
                >
                  {p.desc}
                </motion.p>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg hover:shadow-purple-500/40 transition"
                >
                  {t.projects.cta}
                </motion.a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🔥 تلاتة كروت Top Rated */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8 relative z-10">
        {topRatedProjects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/40 transition group"
          >
            <div className="relative">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition"></div>
            </div>
            <div className="p-6 text-left">
              <h3 className="text-xl font-bold text-purple-700 group-hover:text-purple-900 transition">
                {p.title}
              </h3>
              <p className="mt-2 text-gray-600">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
