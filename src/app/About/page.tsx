"use client";
import { motion } from "framer-motion";
import {
  Code2,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  Award,
} from "lucide-react";
import { useLang } from "../components/context/LangContext";
import { useEffect, useRef, useState } from "react";

// ===== Types للترجمة =====
type Stat = { label: string; value: number }; // value = 0..100 للـ progress
type KPI = { label: string; value: number; suffix?: string }; // عدادات
type Point = { title: string; desc: string };

type AboutTranslation = {
  title: string;
  subtitle: string;
  points: Point[];
  stats: Stat[]; // لرسوم التقدّم
  kpis: KPI[];   // أرقام متحركة
  cta: string;
  badges: string[];
};

type Translation = { about: AboutTranslation };

// ===== Hook للعداد =====
function useCounter(target: number, duration = 1200) {
  const [val, setVal] = useState(0);
  const start = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;
    const step = (ts: number) => {
      if (start.current === null) start.current = ts;
      const p = Math.min(1, (ts - start.current) / duration);
      setVal(Math.round(target * p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return val;
}

// ===== Component فرعي لكل KPI =====
function KpiCard({ kpi, icon, delay }: { kpi: KPI; icon: JSX.Element; delay?: number }) {
  const value = useCounter(kpi.value, 1200);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay || 0 }}
      className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md p-5 flex flex-col items-center text-white shadow-lg"
    >
      <div className="mb-2">{icon}</div>
      <div className="text-3xl font-extrabold">
        {value}
        {kpi.suffix ?? ""}
      </div>
      <div className="text-sm text-gray-300 mt-1">{kpi.label}</div>
    </motion.div>
  );
}

export default function About() {
  const { t } = useLang() as { t: Translation };
  const about = t.about;

  // أيقونات للبوينتس
  const icons = [<Code2 key="c" />, <ShieldCheck key="s" />, <Sparkles key="sp" />];

  return (
    <section
      id="about"
      className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            {about.title}
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {about.subtitle}
          </p>
        </motion.div>

        {/* KPIs */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {about.kpis.map((kpi, i) => {
            const icon =
              i === 0 ? <Rocket size={26} /> :
              i === 1 ? <Users size={26} /> :
              i === 2 ? <Award size={26} /> :
              <ShieldCheck size={26} />;
            
            return <KpiCard key={i} kpi={kpi} icon={icon} delay={i * 0.1} />;
          })}
        </div>

        {/* Cards: لماذا نحن */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {about.points.slice(0, 3).map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md p-6 shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 transition"
            >
              <div className="flex items-center gap-3 text-purple-300">
                <div className="p-2 rounded-xl bg-white/10">
                  {icons[i % icons.length]}
                </div>
                <h3 className="text-xl font-semibold text-white">{p.title}</h3>
              </div>
              <p className="mt-3 text-gray-300">{p.desc}</p>

              {/* Progress bar لكل كارد لو متوفر ستاتس */}
              {about.stats[i] && (
                <div className="mt-5">
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span>{about.stats[i].label}</span>
                    <span>{about.stats[i].value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${about.stats[i].value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-purple-600 to-indigo-500"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {about.badges.map((b, i) => (
            <span
              key={i}
              className="text-sm px-3 py-1 rounded-full bg-white/10 text-white border border-white/15"
            >
              {b}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-700 to-purple-500 text-white font-semibold shadow-lg hover:shadow-purple-500/40 transition"
          >
            <Code2 size={18} />
            {about.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
