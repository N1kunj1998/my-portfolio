"use client";

import { motion } from "framer-motion";
import { useState, ChangeEvent, FormEvent } from "react";
import { FaEnvelopeOpenText } from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus(`Network error. Please try again later. Error ${error}`);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="text-center py-20 px-4 md:px-0 max-w-3xl mx-auto"
    >
      <div className="flex flex-col items-center gap-4">
        <FaEnvelopeOpenText className="text-[var(--accent)] text-4xl" />

        <h2 className="text-3xl font-bold text-[var(--foreground)]">Let’s Connect and Build Together 🤝</h2>

        <p className="text-[var(--foreground)]/80 text-lg">
          {`Whether you're looking for a collaborator, need help with your product, or want to grab a virtual coffee — I'm just a message away.`}
        </p>

        <form onSubmit={handleSubmit} className="w-full mt-8 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[var(--foreground)]/30 rounded bg-transparent text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[var(--foreground)]/30 rounded bg-transparent text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-2 border border-[var(--foreground)]/30 rounded bg-transparent text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          ></textarea>
          <button
            type="submit"
            className="inline-block bg-[var(--accent)] text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Send Message
          </button>
        </form>

        {status && <p className="text-sm mt-4 text-[var(--foreground)]/80">{status}</p>}
      </div>
    </motion.section>
  );
}
