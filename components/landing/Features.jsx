;

import { motion } from "framer-motion";
import {
  BookOpen,
  MessageCircle,
  Brain,
  Calendar,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: BookOpen,
    title: "Unified Digital Classrooms",
    description:
      "Centralize all your course materials and resources in one place.",
    color: "from-blue-500 to-sky-400",
  },
  {
    icon: MessageCircle,
    title: "Seamless Communication",
    description:
      "Connect with students and colleagues effortlessly through integrated messaging.",
    color: "from-sky-400 to-blue-300",
  },
  {
    icon: Brain,
    title: "AI-Powered Assistance",
    description:
      "Get intelligent insights and recommendations to enhance learning outcomes.",
    color: "from-blue-600 to-blue-400",
  },
  {
    icon: Calendar,
    title: "Efficient Course Management",
    description:
      "Streamline scheduling, assignments, and grading with smart tools.",
    color: "from-sky-500 to-blue-400",
  },
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section
      id="features"
      className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white overflow-hidden"
    >
      <div className="container px-4 relative">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-sky-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-96 h-96 bg-gradient-to-tr from-blue-300/20 to-blue-100/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-400 mb-4">
              Key Features
            </h2>
            <p className="max-w-2xl mx-auto text-blue-600/80 text-lg">
              Everything you need to create an exceptional educational
              experience
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="p-6 flex flex-col h-full">
                  <div
                    className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br ${feature.color}`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-blue-900">
                    {feature.title}
                  </h3>
                  <p className="text-blue-600/70 mb-6 flex-grow">
                    {feature.description}
                  </p>

                  <Link
                    href="#"
                    className="inline-flex items-center text-blue-500 font-medium group"
                  >
                    <span className="group-hover:underline">Learn More</span>
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
