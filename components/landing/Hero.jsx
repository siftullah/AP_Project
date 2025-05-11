;

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";

const EducationIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z"
      fill="currentColor"
    />
  </svg>
);

const AiIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 10.5V6.5C21 4.84 19.66 3.5 18 3.5H14.82C14.4 2.61 13.52 2 12.5 2H11.5C10.48 2 9.6 2.61 9.18 3.5H6C4.34 3.5 3 4.84 3 6.5V10.5C2.11 10.92 1.5 11.8 1.5 12.82V14.18C1.5 15.2 2.11 16.08 3 16.5V20.5C3 22.16 4.34 23.5 6 23.5H18C19.66 23.5 21 22.16 21 20.5V16.5C21.89 16.08 22.5 15.2 22.5 14.18V12.82C22.5 11.8 21.89 10.92 21 10.5ZM12 3.5C12.55 3.5 13 3.95 13 4.5C13 5.05 12.55 5.5 12 5.5C11.45 5.5 11 5.05 11 4.5C11 3.95 11.45 3.5 12 3.5ZM5 6.5C5 5.95 5.45 5.5 6 5.5H8.18C8.6 6.39 9.48 7 10.5 7H13.5C14.52 7 15.4 6.39 15.82 5.5H18C18.55 5.5 19 5.95 19 6.5V10.5C18.11 10.92 17.5 11.8 17.5 12.82V14H6.5V12.82C6.5 11.8 5.89 10.92 5 10.5V6.5ZM19 20.5C19 21.05 18.55 21.5 18 21.5H6C5.45 21.5 5 21.05 5 20.5V16.5H19V20.5ZM20.5 14.18C20.5 14.73 20.05 15.18 19.5 15.18H4.5C3.95 15.18 3.5 14.73 3.5 14.18V12.82C3.5 12.27 3.95 11.82 4.5 11.82H19.5C20.05 11.82 20.5 12.27 20.5 12.82V14.18Z"
      fill="currentColor"
    />
  </svg>
);

const CloudIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM19 18H6C3.79 18 2 16.21 2 14C2 11.95 3.53 10.24 5.56 10.03L6.63 9.92L7.13 8.97C8.08 7.14 9.94 6 12 6C14.62 6 16.88 7.86 17.39 10.43L17.69 11.93L19.22 12.04C20.78 12.14 22 13.45 22 15C22 16.65 20.65 18 19 18Z"
      fill="currentColor"
    />
  </svg>
);

export default function Hero() {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="relative w-full min-h-screen pt-16 flex items-center justify-center overflow-hidden">
      {/* Beautiful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-sky-300 to-blue-100 z-0">
        {/* Animated wave effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-64 opacity-20"
          initial={{ backgroundPosition: "0% 0%" }}
          animate={{ backgroundPosition: "100% 0%" }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 20,
            ease: "linear",
          }}
          style={{
            backgroundImage:
              "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDQwIDMyMCI+PHBhdGggZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBkPSJNMCw5NkwzMCw4MC43QzYwLDY1LDEyMCwzNSwxODAsNDIuN0MyNDAsNTEsMzAwLDk2LDM2MCwxMTJDNDIwLDEyOCw0ODAsOTYsNTQwLDgwQzYwMCw2NCw2NjAsNjQsNzIwLDk2QzgwMCwxMzcsODQwLDIwOCw5MDAsMjQ1LjNDOTYwLDI3NywxMDIwLDI3NywxMDgwLDI1MC43QzExNDAsMjIzLDEyMDAsMTcxLDEyNjAsMTYwQzEzMjAsMTQ5LDEzODAsMTgxLDE0MTAsMTk3LjNMMTQ0MCwyMTNWMzIwSDE0MTBDMTM4MCwzMjAsMTMyMCwzMjAsMTI2MCwzMjBDMTIwMCwzMjAsMTE0MCwzMjAsMTA4MCwzMjBDMTAyMCwzMjAsOTYwLDMyMCw5MDAsMzIwQzg0MCwzMjAsNzgwLDMyMCw3MjAsMzIwQzY2MCwzMjAsNjAwLDMyMCw1NDAsMzIwQzQ4MCwzMjAsNDIwLDMyMCwzNjAsMzIwQzMwMCwzMjAsMjQwLDMyMCwxODAsMzIwQzEyMCwzMjAsNjAsMzIwLDMwLDMyMEwwLDMyMFoiPjwvcGF0aD48L3N2Zz4=')",
            backgroundSize: "100% 100%",
          }}
        />

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-[15%] left-[10%] text-white opacity-70"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <CloudIcon className="w-24 h-24" />
          </motion.div>

          <motion.div
            className="absolute top-[35%] right-[15%] text-white opacity-70"
            animate={{
              y: [0, -20, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 7,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 1,
            }}
          >
            <CloudIcon className="w-32 h-32" />
          </motion.div>

          <motion.div
            className="absolute top-[60%] left-[10%] text-white opacity-70"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <EducationIcon className="w-24 h-24" />
          </motion.div>

          <motion.div
            className="absolute bottom-[25%] right-[10%] text-white opacity-70"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 18,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <AiIcon className="w-28 h-28" />
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex items-center justify-center">
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={containerVariants}
          className="flex flex-col items-center space-y-6 text-center py-12 max-w-6xl mx-auto"
        >
          <motion.div
            className="rounded-full bg-white/10 backdrop-blur-sm px-6 py-2 border border-white/20 shadow-lg"
            variants={itemVariants}
          >
            <span className="text-white font-medium">
              AI-Powered Education Platform
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mx-auto"
            variants={itemVariants}
          >
            <span className="text-white drop-shadow-md">
              Transforming Education
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 drop-shadow-sm">
              with AI-Powered Integration
            </span>
          </motion.h1>

          <motion.p
            className="max-w-[700px] text-white text-lg md:text-xl opacity-90"
            variants={itemVariants}
          >
            One platform for all your academic needs—classroom management,
            communication, and AI assistance, seamlessly unified.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:space-x-4 w-full sm:w-auto justify-center"
            variants={itemVariants}
          >
            <Button
              size="lg"
              className="bg-white text-sky-600 hover:bg-blue-50 transition-all shadow-lg font-bold px-8 py-6"
            >
              Get Started Today
            </Button>
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg font-bold border border-white/30 px-8 py-6"
            >
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            className="mt-16 w-full max-w-4xl bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 flex justify-center items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <img
              src="/saas-demo.png"
              alt="Platform Preview"
              className="w-full h-auto object-cover rounded shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-70"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
