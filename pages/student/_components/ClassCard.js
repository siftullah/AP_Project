"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import Link from "next/link";

export const ClassCard = ({ classroom, index }) => {
  // Generate a consistent color based on the class name
  const colors = [
    "from-blue-500 to-blue-400",
    "from-blue-600 to-blue-500",
    "from-blue-700 to-blue-600",
    "from-blue-800 to-blue-700",
  ];

  const colorIndex = classroom.name.length % colors.length;
  const gradientColor = colors[colorIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: index * 0.05,
          duration: 0.4,
        },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white shadow-sm hover:shadow-md border border-blue-100 rounded-xl overflow-hidden transition-all cursor-pointer"
    >
      <Link href={`/student/classes/${classroom.id}`}>
        <div className={`h-3 bg-gradient-to-r ${gradientColor}`}></div>
        <div className="p-5">
          <h3 className="mb-1 font-semibold text-black-900 text-xl">
            {classroom.name}
          </h3>
          <p className="mb-4 text-black-600 text-sm">
            {classroom.course_code} - {classroom.course_name}
          </p>

          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="w-5 h-5 text-black-700" />
            </div>
            <span className="text-black-800">{classroom.teacher}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
