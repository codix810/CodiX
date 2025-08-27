"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

type MediaItem = {
  _id: string;
  name: string;
  description: string;
  images: { url: string; publicId: string }[];
  video?: { url: string; publicId: string };
  createdAt?: string;
};

export default function ProjectDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<MediaItem | null>(null);

  useEffect(() => {
    fetch(`/api/media/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setProject(data.data);
      });
  }, [id]);

if (!project)
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <motion.div
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        className="text-6xl md:text-12xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
      >
        {"</>"}
      </motion.div>
    </div>
  );
  return (
    <section className="relative min-h-screen  bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900  text-white py-16 px-6 mt-5">
      {/* زر رجوع */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition"
      >
        <ArrowLeft size={20} />
        رجوع
      </button>

      {/* العنوان */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
      >
        {project.name}
      </motion.h1>

      {/* الوصف داخل كارد شفاف */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-6 mx-auto max-w-3xl bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl text-center"
      >
        <p className="text-lg leading-relaxed text-gray-200">
          {project.description}
        </p>
        {project.createdAt && (
          <p className="mt-4 text-sm text-gray-400">
            📅 {new Date(project.createdAt).toLocaleDateString()}
          </p>
        )}
      </motion.div>

      {/* سلايدر الصور والفيديو */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="mt-12 max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
      >
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="w-full h-[70vh]"
        >
          {project.video && (
            <SwiperSlide>
              <video
                src={project.video.url}
                controls
                className="w-full h-full object-cover rounded-xl"
              />
            </SwiperSlide>
          )}
          {project.images.map((img, i) => (
            <SwiperSlide key={i}>
              <Image 
                src={img.url}
                alt={project.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}
