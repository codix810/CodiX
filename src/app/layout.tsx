import "./globals.css";
import { LangProvider } from "./components/context/LangContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import type { Metadata } from "next";

// ✅ ميتاداتا بقت Typed
export const metadata: Metadata = {
  title: "CodiX 🧑‍💻",
  description: "موقع احترافي معمول بـ Next.js",
};

// ✅ RootLayout Props
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
