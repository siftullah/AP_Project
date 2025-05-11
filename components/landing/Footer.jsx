"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const socialIconVariants = {
  hover: { scale: 1.1, y: -2 },
};

export default function Footer() {
  return (
    <motion.footer
      className="w-full py-12 bg-[#004275] text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wider uppercase">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-blue-300" />
                <span>info@eduassist.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-blue-300" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-blue-300 mt-1" />
                <span>
                  123 Education St,
                  <br />
                  Academic City, AC 12345
                </span>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#features"
                  className="hover:text-blue-300 transition-colors duration-200"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="hover:text-blue-300 transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-blue-300 transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wider uppercase">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-blue-300 transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-blue-300 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wider uppercase">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="text-white hover:text-blue-300 transition-colors duration-200"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </motion.a>
              <motion.a
                href="#"
                className="text-white hover:text-blue-300 transition-colors duration-200"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                href="#"
                className="text-white hover:text-blue-300 transition-colors duration-200"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
        <motion.div
          variants={itemVariants}
          className="pt-8 mt-8 border-t border-blue-600 text-center"
        >
          <p className="text-sm text-blue-200 font-light tracking-wide">
            &copy; {new Date().getFullYear()} EduAssist. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
