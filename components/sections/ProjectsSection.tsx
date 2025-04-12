"use client";

import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import Image from "next/image";

const projects = [
  {
    title: "Ecommerce Application",
    tech: ["react", "nodejs", "express", "mongodb", "javascript", "stripe"],
    description:
      "A responsive e-commerce platform with Stripe for payments and Cloudinary for media.",
    github: "https://github.com/N1kunj1998/ECOMMERCE",
    live: "https://ecommerce-zqvy.onrender.com/",
  },
  {
    title: "iGlobe",
    tech: ["springboot", "mysql", "react", "docker", "jenkins"],
    description:
      "A student marketplace with buy/sell/donate features, deployed via Docker and Jenkins.",
    github: "https://github.com/N1kunj1998/iGlobe",
  },
  {
    title: "Railway Ticket Booking System",
    tech: ["c", "linux"],
    description:
      "A client-server CLI tool for ticket reservations using Linux system calls.",
    github: "https://github.com/N1kunj1998/Railway-Ticket-Booking-System",
  },
];

export default function ProjectsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="py-16"
    >
      <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8 text-center">
        Featured Projects 🚀
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            className="group border border-[var(--foreground)]/10 rounded-xl p-5 bg-[var(--background)] shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
              {project.title}
            </h3>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 bg-[var(--pill-bg)] border border-[var(--foreground)]/10 text-[var(--foreground)] text-xs px-3 py-1 rounded-md"
                >
                  <Image
                    src={`/icons/${tech}.svg`}
                    alt={tech}
                    width={16}
                    height={16}
                    className="inline"
                  />
                  {tech.charAt(0).toUpperCase() + tech.slice(1)}
                </span>
              ))}
            </div>

            <p className="text-sm text-[var(--foreground)]/80 mb-4">
              {project.description}
            </p>
            <div className="flex gap-4 text-[var(--accent)]">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <FaGithub /> GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <FaExternalLinkAlt /> Live
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
