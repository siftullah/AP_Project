;

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const benefits = [
  "Unified platform for all educational needs",
  "AI-powered insights and recommendations",
  "Streamlined communication between students and teachers",
  "Automated administrative tasks",
];

export default function About() {
  return (
    <section
      id="about"
      className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Gradient background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-sky-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-blue-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 xl:grid-cols-2">
          <motion.div
            className="flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium max-w-fit">
              About Our Platform
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-sky-500">
              Say goodbye to fragmented systems
            </h2>
            <p className="max-w-[600px] text-blue-600/80 text-lg">
              EduAssist integrates classroom management, communication, and
              assessments into one user-friendly platform. Experience the power
              of a unified academic ecosystem designed to enhance productivity
              and learning outcomes.
            </p>

            <ul className="space-y-3 pt-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
                >
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-blue-500" />
                  <span className="text-blue-700">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="mx-auto flex w-full items-center justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full max-w-md lg:max-w-xl">
              {/* Decorative gradient elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-300 rounded-lg rotate-12 blur opacity-30" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-sky-400 to-blue-200 rounded-lg -rotate-12 blur opacity-30" />

              {/* Main image */}
              <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border border-blue-100/80">
                <Image
                  alt="EduAssist Platform"
                  className="aspect-video w-full object-cover object-center"
                  height="400"
                  width="600"
                  src="/people-img.png"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
