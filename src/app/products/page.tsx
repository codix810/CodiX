"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

type Project = {
  _id: string;
  name: string;
  description: string;
  images: { url: string; publicId: string }[];
  video?: { url: string; publicId: string };
  createdAt: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/media")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setProjects(data.data);
      })
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
    <section className="  py-12 grid md:grid-cols-3 gap-8 mt-10  bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 ">
      {projects.map((p, i) => (
        <motion.div
          key={p._id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="p-5 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 group hover:shadow-purple-500/40 transition"
        >
          <Link href={`/products/${p._id}`}>
            <Image 
              src={p.images[0]?.url || "/no-image.png"}
              alt={p.name}
              className="rounded-xl h-48 w-full object-cover"
            />
            <h3 className="text-xl font-semibold mt-4 text-white group-hover:text-purple-300 transition">
              {p.name}
            </h3>
            <p className="mt-2 text-gray-300 text-sm line-clamp-2">{p.description}</p>
          </Link>
        </motion.div>
      ))}
    </section>
  );
}
