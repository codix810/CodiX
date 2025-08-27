"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link"; // 👈 استدعاء لينك
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type MediaItem = {
  _id: string;
  name: string;
  description: string;
  images: { url: string; publicId: string }[];
  video?: { url: string; publicId: string };
};

export default function Projects() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/media")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setItems(data.data);
        }
      })
      .catch((err) => console.error("Fetch Error:", err))
      .finally(() => setLoading(false));
  }, []);

if (loading)
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <motion.div
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
      >
        {"</>"}
      </motion.div>
    </div>
  );

  return (
    <section
      id="projects"
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900"
    >
      {/* 🔥 Slider */}
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
        {items.map((item) => (
          <SwiperSlide key={item._id}>
            <Link href={`/products/${item._id}`}> {/* 👈 رابط لصفحة التفاصيل */}
              <div className="relative w-full h-[80vh] cursor-pointer">
                {item.video ? (
                  <video
                    src={item.video.url}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : item.images.length > 0 ? (
                  <img
                    src={item.images[0].url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    No media
                  </div>
                )}

                <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-6">
                  <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg"
                  >
                    {item.name}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-4 text-lg md:text-2xl text-gray-200 max-w-2xl"
                  >
                    {item.description}
                  </motion.p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🔥 كروت */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8 relative z-10">
        {items.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/40 transition group"
          >
            <Link href={`/products/${item._id}`}> {/* 👈 هنا كمان */}
              <div className="relative">
                {item.images.length > 0 ? (
                  <img
                    src={item.images[0].url}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-gray-200">
                    📁 لا يوجد صورة
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition"></div>
              </div>
              <div className="p-6 text-left">
                <h3 className="text-xl font-bold text-purple-700 group-hover:text-purple-900 transition">
                  {item.name}
                </h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
