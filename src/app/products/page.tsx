"use client";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useLang } from "../components/context/LangContext";
import { ExternalLink } from "lucide-react";

type Project = {
  title: string;
  desc: string;
  image: string;
  link: string;
};

type ProjectsTranslation = {
  title: string;
  subtitle: string;
  detailsBtn: string;
  cta: string;
  rights: string;
  stats: { label: string; value: string }[];
  items: Project[];
};

type Translation = { projectss: ProjectsTranslation };

export default function ProjectsPage() {
  const { t } = useLang() as { t: Translation };
  const projectss = t.projectss;

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 relative">
      {/* العنوان */}
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            {projectss.title}
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {projectss.subtitle}
          </p>
        </motion.div>
      </div>

      {/* السوايبر العريض */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          className="w-full h-[60vh]"
        >
          {projectss.items.map((p, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-6">
                  <h3 className="text-3xl md:text-4xl font-bold">{p.title}</h3>
                  <p className="mt-3 max-w-2xl text-gray-200">{p.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* الكروت تحت السوايبر */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        {projectss.items.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 group hover:shadow-purple-500/40 transition"
          >
            <img
              src={p.image}
              alt={p.title}
              className="rounded-xl h-40 w-full object-cover"
            />
            <h3 className="text-xl font-semibold mt-4 text-white group-hover:text-purple-300 transition">
              {p.title}
            </h3>
            <p className="mt-2 text-gray-300 text-sm">{p.desc}</p>
            <a
              href={p.link}
              target="_blank"
              className="mt-3 inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
            >
              {projectss.detailsBtn} <ExternalLink size={18} />
            </a>
          </motion.div>
        ))}
      </div>

      {/* نسب / احصائيات */}
      <div className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {projectss.stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="text-white"
          >
            <h4 className="text-3xl font-bold text-purple-400">{s.value}</h4>
            <p className="text-gray-300 mt-2">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center py-12">
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-700 to-purple-500 text-white font-semibold text-lg shadow-lg hover:shadow-purple-500/50 transition"
        >
          {projectss.cta}
        </motion.a>
      </div>
    </section>
  );
}
