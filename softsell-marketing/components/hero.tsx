"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create animated dots
    if (heroRef.current) {
      const heroElement = heroRef.current;
      const dotsContainer = document.createElement("div");
      dotsContainer.className = "animated-dots";

      // Create dots
      for (let i = 0; i < 50; i++) {
        const dot = document.createElement("div");
        dot.className = "dot";

        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        dot.style.left = `${x}%`;
        dot.style.top = `${y}%`;

        // Random size
        const size = Math.random() * 3 + 1;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;

        // Random animation
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        dot.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;

        dotsContainer.appendChild(dot);
      }

      heroElement.appendChild(dotsContainer);

      return () => {
        if (heroElement.contains(dotsContainer)) {
          heroElement.removeChild(dotsContainer);
        }
      };
    }
  }, []);

  return (
    <section className="hero-section pb-0" ref={heroRef}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-10"
        >
          <h1 className="mega-title">SOFTSELL</h1>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hero-image-container"
      >
        <img
          src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2070&auto=format&fit=crop"
          alt="Business team analyzing software assets and licenses"
          className="w-full h-[60vh] object-cover"
        />
        <div className="hero-image-overlay">
          <div className="container mx-auto px-4, sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border-l-4 border-[#25D366] transform -rotate-1"
              >
                <h3 className="text-2xl md:text-4xl font-bold mb-2 text-white">
                  Transforming Unused Software
                </h3>
                <h3 className="text-2xl md:text-4xl font-bold text-[#25D366]">
                  Into Revenue Streams
                </h3>
                <p className="text-white/80 mt-2">
                  Unlock the hidden value in your software portfolio
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-20">
          <div>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-black to-[#25D366] dark:from-white dark:to-[#25D366] bg-clip-text text-transparent">
              Unlock the Value of Your Unused Software Licenses
            </h2>
          </div>
          <div>
            <p className="text-xl mb-8 text-gray-800 dark:text-gray-200">
              SoftSell helps businesses recover costs by reselling unused software licenses. Turn your idle digital
              assets into immediate cash flow with our streamlined platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 font-medium bg-black text-white dark:bg-white dark:text-black hover:bg-[#25D366] dark:hover:bg-[#25D366] dark:hover:text-white transition-colors duration-200 relative overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-6 py-3 font-medium border border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent text-black dark:text-white hover:border-[#25D366] dark:hover:border-[#25D366] transition-colors duration-200 relative overflow-hidden"
              >
                <span className="relative z-10">Learn More</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
