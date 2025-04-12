"use client";

import { FaBriefcase, FaSchool } from "react-icons/fa";
import { motion } from "framer-motion";

const timelineData = [
  {
    type: "work",
    title: "Spirinova Technologies Pvt Ltd ",
    role: "Software Development Engineer II",
    duration: "Dec 2024 – Present",
    points: [
      "Built data visualization dashboards using React and Plotly.js",
      "Integrated OpenSearch for scalable data search and filtering",
      "Led frontend development of an internal AI-based analytics tool",
    ],
  },
  {
    type: "work",
    title: "Qualcomm India Pvt Ltd",
    role: "Software Development Engineer",
    duration: "Jul 2023 – Aug 2024",
    points: [
      "Designed fullstack internal tools using React, Node.js, MongoDB",
      "Built custom file-diffing logic for engineering productivity",
      "Worked with CI/CD pipelines using Jenkins and Docker",
    ],
  },
  {
    type: "work",
    title: "Qualcomm India Pvt Ltd",
    role: "Software Development Engineer - Intern",
    duration: "Jan 2023 – Jun 2023",
    points: [
      "Designed fullstack internal tools using React, Node.js, MongoDB",
      "Built custom file-diffing logic for engineering productivity",
      "Worked with CI/CD pipelines using Jenkins and Docker",
    ],
  },
  {
    type: "edu",
    title: "IIIT Bangalore",
    role: "M.Tech in Computer Science",
    duration: "July 2021 – July 2023",
    points: [
      "Studied DSA, operating systems, system design",
      "Built multiple fullstack projects during coursework",
    ],
  },
  {
    type: "edu",
    title: "Gujarat Technological University (GTU)",
    role: "B.E. in Computer Engineering",
    duration: "July 2016 – May 2020",
    points: [
      "Strong foundation in C/C++, DBMS, CN, OS",
      "Started passion for building & deploying apps",
    ],
  },
];

export default function TimelineSection() {
  return (
    <section className="relative pt-28 pb-20 px-4 md:px-0 max-w-5xl mx-auto">
      {/* Timeline Line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-[var(--foreground)]/20" />

      {/* Timeline Items */}
      <div className="space-y-16 relative z-10">
        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;
          const Icon = item.type === "edu" ? FaSchool : FaBriefcase;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Spacer */}
              <div className="hidden md:block w-1/2" />
          
              {/* Connector Line */}
              <div
                className={`hidden md:block absolute top-1/2 h-0.5 w-10 bg-[var(--foreground)]/20 ${
                  isLeft ? 'left-1/2 ml-1' : 'right-1/2 mr-1'
                }`}
              />
          
              {/* Dot */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[var(--accent)] border-[4px] border-white dark:border-[var(--background)] shadow-md z-10" />
          
              {/* Content */}
              <div
                className={`w-full md:w-1/2 px-6 md:px-8 py-4 border rounded-lg bg-[var(--background)] border-[var(--foreground)]/10 shadow mt-4 md:mt-0 ${
                    isLeft ? 'md:ml-10' : 'md:mr-10'
                } hover:shadow-lg hover:scale-[1.03] transition-transform duration-300 ease-in-out`}
                >
                <div className="flex items-center gap-3 mb-2 text-[var(--accent)]">
                  <Icon className="text-xl drop-shadow" />
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
                </div>
                <p className="text-sm text-[var(--foreground)]/70">{item.role}</p>
                <p className="text-xs text-[var(--foreground)]/50 mb-2">{item.duration}</p>
                <ul className="list-disc list-inside text-[var(--foreground)]/80 text-sm space-y-1">
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )
          ;
        })}
      </div>
    </section>
  );
}
