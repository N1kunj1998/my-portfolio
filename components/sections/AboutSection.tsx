"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="py-16 px-4 md:px-0 max-w-5xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2 text-center">
        Who’s Behind the Code?
      </h2>
      <p className="text-[var(--foreground)]/70 text-center text-base mb-6">
        A developer driven by curiosity, clean code, and a love for solving real-world problems.
      </p>

      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Left: Image or illustration */}
        <div className="w-full md:w-1/3">
        <div className="grid grid-cols-3 gap-4">
  <Image src="/icons/react.svg" alt="React" width={40} height={40} />
  <Image src="/icons/nextjs.svg" alt="Next.js" width={40} height={40} />
  <Image src="/icons/nodejs.svg" alt="Node.js" width={40} height={40} />
  {/* add more */}
</div>
        </div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:w-2/3 text-[var(--foreground)]"
        >
          <p className="text-lg leading-relaxed mb-4">
            Hey there! I'm Nikunj, a Fullstack Developer with a strong foundation in Computer Science
            and a deep passion for building high-impact web applications. I hold a Master’s in
            Computer Science from IIIT Bangalore and have had the opportunity to work at top companies
            like Qualcomm and Spirinova.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            I specialize in React, Next.js, TypeScript, Node.js, and FastAPI, and enjoy working across
            the stack — whether it’s designing frontend components with beautiful UI/UX or crafting
            scalable APIs. I'm also experienced with data visualization using Plotly.js and real-time
            features with MongoDB and Redis.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            I’m always curious about solving problems through technology, love clean code, and aim to
            contribute to impactful, developer-friendly products.
          </p>
          <a
            href="/about"
            className="inline-block mt-3 px-5 py-2 rounded-full bg-[var(--accent)] text-white hover:opacity-90 transition"
          >
            Dive Deeper →
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}