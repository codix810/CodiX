"use client";

import Hero from "./components/Hero";
import Projects from "./components/Projects";
import WhyUs from "./components/WhyUs";
import Presentation from "./components/Presentation";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Projects />
      <WhyUs />
      <Presentation />
    </div>
  );
}
