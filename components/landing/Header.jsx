;

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 py-3 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 relative z-10">
          <motion.img
            src={isScrolled ? "/fyp-logo.png" : "/fyp-logo-white.png"}
            alt="eduassist"
            className="h-12 w-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium absolute left-1/2 transform -translate-x-1/2">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Link
                href={link.href}
                className={`transition-colors hover:text-blue-600 ${
                  isScrolled ? "text-blue-900" : "text-white"
                }`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Sign in/up buttons */}
        <div className="flex gap-4 relative z-10">
          <SignedOut>
            <motion.div
              className="hidden md:flex items-center space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/sign-in">
                <button
                  className={`px-5 py-2 rounded-md transition-all font-bold ${
                    isScrolled
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg font-bold"
                  }`}
                >
                  Login
                </button>
              </Link>
              <Link href="/sign-up">
                <button
                  className={`px-5 py-2 rounded-md font-bold transition-all ${
                    isScrolled
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-white text-sky-600 hover:bg-blue-50"
                  }`}
                >
                  Sign Up
                </button>
              </Link>
            </motion.div>
          </SignedOut>

          <SignedIn>
            <motion.div
              className="hidden md:flex space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/dashboard">
                <button
                  className={`px-5 py-2 rounded-md font-bold transition-all ${
                    isScrolled
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-white text-sky-600 hover:bg-blue-50"
                  }`}
                >
                  Dashboard
                </button>
              </Link>
              <SignOutButton>
                <button className="px-5 py-2 rounded-md transition-all bg-red-500 hover:bg-red-600 text-white">
                  Sign Out
                </button>
              </SignOutButton>
            </motion.div>
          </SignedIn>

          {/* Mobile menu button */}
          <button
            className="md:hidden relative z-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X
                className={isScrolled ? "text-blue-900" : "text-white"}
                size={24}
              />
            ) : (
              <Menu
                className={isScrolled ? "text-blue-900" : "text-white"}
                size={24}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-gradient-to-b from-blue-600 to-blue-400 pt-20 px-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="flex flex-col space-y-6 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white text-lg font-medium py-2 border-b border-white/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 space-y-4">
              <SignedOut>
                <Link href="/sign-in" className="w-full">
                  <button className="w-full px-5 py-2 rounded-md border border-white text-white bg-transparent hover:bg-white/10 font-bold ">
                    Login
                  </button>
                </Link>
                <Link href="/sign-up" className="w-full">
                  <button className="w-full px-5 py-2 rounded-md bg-white text-blue-600 hover:bg-blue-50 font-bold">
                    Sign Up
                  </button>
                </Link>
              </SignedOut>

              <SignedIn>
                <Link href="/dashboard" className="w-full">
                  <button className="w-full px-5 py-2 rounded-md bg-white text-blue-600 hover:bg-blue-50 font-bold">
                    Dashboard
                  </button>
                </Link>
                <SignOutButton>
                  <button className="w-full px-5 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white">
                    Sign Out
                  </button>
                </SignOutButton>
              </SignedIn>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
