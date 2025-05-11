"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "EduAssist has completely streamlined our classroom management and communication processes!",
    author: "Sir. Ishaq Raza",
    role: "Professor of Computer Science",
    avatar: "/avatars/avatar-1.jpg",
    stars: 5,
  },
  {
    quote:
      "As a student, I love how easy it is to access all my course materials and communicate with my professors.",
    author: "Ahmad Ifthikhar",
    role: "Undergraduate Student",
    avatar: "/avatars/avatar-2.jpg",
    stars: 5,
  },
  {
    quote:
      "The AI-powered insights have revolutionized how we approach student engagement and success.",
    author: "Dr. Summaira Sarfraz",
    role: "Director FAST NUCES Lahore",
    avatar: "/avatars/avatar-3.jpg",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section
      id="reviews"
      className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Gradient background elements */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full bg-gradient-to-b from-white via-blue-50 to-white opacity-70" />
        <div className="absolute -bottom-40 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-400 mb-4">
            What People Are Saying
          </h2>
          <p className="max-w-2xl mx-auto text-blue-600/70 text-lg">
            Hear from educators and students who have transformed their academic
            experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="flex flex-col h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-col h-full bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100">
                {/* Card header with gradient */}
                <div className="h-3 bg-gradient-to-r from-blue-500 to-sky-400" />

                <div className="flex flex-col flex-grow p-6 space-y-4">
                  {/* Rating stars */}
                  <div className="flex mb-2">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative flex-grow">
                    <Quote className="absolute -top-1 -left-1 w-8 h-8 text-blue-100 rotate-180" />
                    <blockquote className="text-base text-blue-700 pl-6 italic">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>
                  </div>

                  {/* Author info */}
                  <div className="flex items-center mt-4 pt-4 border-t border-blue-50">
                    <Image
                      alt={testimonial.author}
                      className="rounded-full border-2 border-blue-100"
                      height="48"
                      width="48"
                      src={testimonial.avatar}
                      style={{
                        objectFit: "cover",
                      }}
                    />
                    <div className="ml-3">
                      <div className="font-medium text-blue-900">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-blue-500">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
