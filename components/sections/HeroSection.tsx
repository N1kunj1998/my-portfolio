"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedPulseLink from "../common/AnimatedPulseLink";
import { Typewriter } from "react-simple-typewriter";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col-reverse md:flex-row items-center justify-between gap-10"
    >
      {/* Left */}
      <div className="text-left md:w-1/2">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-[var(--foreground)] leading-tight">
        Hey, I’m <span className="text-[var(--accent)]">Nikunj</span>
      </h1>

      <div className="text-xl text-[var(--accent)] font-semibold h-8 mb-2">
        <Typewriter
          words={[
            'Fullstack Developer',
            'Frontend Expert',
            'Backend Engineer',
            'React & Node.js Developer',
          ]}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={60}
          deleteSpeed={40}
          delaySpeed={1500}
        />
      </div>

      <p className="text-[var(--foreground)]/80 max-w-xl text-lg md:text-xl">
        I build clean, scalable, and performance-driven web apps with modern tech.
      </p>
        <AnimatedPulseLink />
      </div>

      {/* Right */}
      <div className="md:w-1/2">
        <Image
          src="/developer-illustration.svg" // 🖼️ Replace this with your actual image path
          alt="Fullstack Developer Illustration"
          width={500}
          height={500}
          className="w-full h-auto object-contain"
        />
      </div>
    </motion.section>
  );
}
