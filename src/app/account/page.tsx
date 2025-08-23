"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare, Send } from "lucide-react";
import { useLang } from "../components/context/LangContext";

// ===== Types للترجمة =====
type ContactTranslation = {
  title: string;
  subtitle: string;
  form: {
    name: string;
    email: string;
    message: string;
    button: string;
  };
  methods: { label: string; value: string }[];
};

type Translation = { contact: ContactTranslation };

export default function Contact() {
  const { t } = useLang() as { t: Translation };
  const contact = t.contact;

  return (
    <section
      id="contact"
      className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            {contact.title}
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {contact.subtitle}
          </p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 gap-10">
          {/* الفورم */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/15 p-8 flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder={contact.form.name}
              className="p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
            />
            <input
              type="email"
              placeholder={contact.form.email}
              className="p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
            />
            <textarea
              placeholder={contact.form.message}
              rows={5}
              className="p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-700 to-purple-500 text-white font-semibold shadow-lg hover:shadow-purple-500/40 transition"
            >
              <Send size={18} />
              {contact.form.button}
            </button>
          </motion.form>

          {/* طرق التواصل */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6 justify-center"
          >
            {contact.methods.map((m, i) => {
              const icon =
                i === 0 ? <Mail size={24} /> :
                i === 1 ? <Phone size={24} /> :
                <MessageSquare size={24} />;
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white/10 border border-white/15 rounded-xl p-5 text-white shadow-md hover:shadow-purple-500/30 transition"
                >
                  <div className="p-3 rounded-full bg-purple-600/30">{icon}</div>
                  <div>
                    <p className="text-sm text-gray-300">{m.label}</p>
                    <p className="font-medium">{m.value}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
