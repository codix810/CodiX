"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLang } from "./context/LangContext";

type Review = {
  name: string;
  message: string;
  rating: number;
  createdAt: string;
};

export default function ReviewsSwiper() {
  const { t } = useLang();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/contact");
        const data = await res.json();
        setReviews(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  if (loading)
    return <p className="text-white text-center mt-10">جاري التحميل...</p>;

  if (reviews.length === 0)
    return <p className="text-white text-center mt-10">لا يوجد تقييمات بعد.</p>;

  return (
    <section className="py-20 text-center bg-gradient-to-tl from-violet-800 via-black to-black relative">
      {/* العنوان */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-white mb-12 drop-shadow-lg"
      >
        {t.reviews?.title || "آراء عملائنا"}
      </motion.h2>

      {/* الكروت */}
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((r, i) => (
          <SwiperSlide key={i}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 text-white"
            >
              <div className="flex justify-center gap-2 mb-3">
                {[1,2,3,4,5].map(star => (
                  <Star
                    key={star}
                    size={24}
                    className={star <= r.rating ? "text-yellow-400" : "text-gray-400"}
                  />
                ))}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{r.name || "مجهول"}</h3>
              <p className="text-gray-200">{r.message}</p>
              <p className="text-gray-400 text-sm mt-2">
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
