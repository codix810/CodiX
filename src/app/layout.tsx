import "./globals.css";
import { LangProvider } from "./components/context/LangContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CodiX 🧑‍💻",
  description: `
CodiX | Software, Web & App Experts | شركة كودكس للبرمجيات  

CodiX is a leading software company based in Egypt, founded by Mahmoud Ali and Mohamed Mostafa.  
We specialize in developing **modern websites, powerful web applications, and mobile apps** using cutting-edge technologies like Next.js, React, PHP, Node.js, and more.  
Our mission is to deliver **secure, scalable, and innovative digital solutions** for businesses, startups, and enterprises across Egypt and the Middle East.  

كودكس هي شركة برمجيات احترافية مصرية، تأسست على يد محمود علي ومحمد مصطفى.  
نحن نقدم خدمات تصميم وتطوير المواقع، تطبيقات الموبايل، المتاجر الإلكترونية، وحلول UI/UX متكاملة، بالإضافة إلى خدمات الأمن السيبراني.  
هدفنا هو مساعدة الشركات والناشئين على تحقيق التحول الرقمي وتطوير مشاريع تكنولوجية ناجحة.  

With CodiX, your ideas turn into reality
  `,
  keywords:
    "CodiX, Mahmoud Ali, Mohamed Mostafa, Software Company, Web Development Egypt, App Development Egypt, React Developer, PHP Developer, Full Stack Developer, Next.js, JavaScript, UI UX Design, Cybersecurity, Egypt Tech Company, codix company, محمود علي, محمد مصطفى, شركة برمجة, شركة كودكس, تطبيقات موبايل, متاجر الكترونية, شركة برمجة مصرية",
  authors: [{ name: "Mahmoud Ali & Mohamed Mostafa" }],
  openGraph: {
    title: "CodiX Software Solutions – Web & App Experts",
    description:
      "CodiX builds modern websites, secure apps, and full-stack digital solutions. Founded by Mahmoud Ali & Mohamed Mostafa, we empower startups and enterprises in Egypt and the Middle East.",
    url: "https://codix810.vercel.app",
    type: "website",
    images: [
      {
        url: "https://codix810.vercel.app/icon.jpg",
        width: 1200,
        height: 630,
        alt: "CodiX Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodiX | Software, Web & App Solutions by Mahmoud Ali & Mohamed Mostafa",
    description:
      "CodiX delivers websites, mobile apps, UI/UX design, and cybersecurity services for startups and enterprises across Egypt and beyond.",
    images: ["https://codix810.vercel.app/icon.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/icon.jpg", type: "image/jpeg" },
    ],
    apple: "/icon.jpg",
    shortcut: "/icon.jpg",
  },
  manifest: "/icon.jpg",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <LangProvider>
          <Navbar />
          {children}
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
