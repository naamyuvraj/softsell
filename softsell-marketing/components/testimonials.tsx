"use client";

import type React from "react";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "SoftSell helped us recover over $50,000 from unused enterprise licenses. The process was seamless and their valuation was higher than we expected.",
      name: "Sarah Johnson",
      role: "CTO, TechNova Solutions",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    },
    {
      quote:
        "After downsizing our team, we had dozens of premium software licenses sitting idle. SoftSell turned these liabilities into assets with minimal effort on our part.",
      name: "Michael Chen",
      role: "IT Director, Global Innovations Inc.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    },
    {
      quote:
        "The valuation process was transparent and fair. We were able to recoup nearly 70% of our original investment on licenses we no longer needed.",
      name: "Emily Rodriguez",
      role: "Finance Manager, Nexus Corp",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    },
    {
      quote:
        "SoftSell's platform is intuitive and their customer service is exceptional. They guided us through the entire process with professionalism and expertise.",
      name: "David Kim",
      role: "Operations Director, Quantum Systems",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    },
    {
      quote:
        "We were skeptical at first, but SoftSell delivered on every promise. The ROI on our unused licenses was substantial and helped fund new initiatives.",
      name: "Jessica Patel",
      role: "CEO, Innovate Solutions",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    },
    {
      quote:
        "Their market knowledge is impressive. They knew exactly which licenses were in demand and helped us price them competitively for quick sales.",
      name: "Robert Wilson",
      role: "IT Asset Manager, Horizon Tech",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    },
    {
      quote:
        "The compliance verification process gave us peace of mind that all transfers were legal and properly documented. Highly recommended!",
      name: "Sophia Martinez",
      role: "Legal Counsel, DataStream Inc.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
    },
    {
      quote:
        "We've been using SoftSell for over two years now, and it's become an essential part of our IT asset management strategy. The ROI speaks for itself.",
      name: "James Taylor",
      role: "CFO, Pinnacle Systems",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
    },
  ];

  const sliderRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [animationPaused, setAnimationPaused] = useState(false);

  // Continuous animation effect
  useEffect(() => {
    let animationId: number;
    let startTime: number;
    const duration = 300000; // Time to complete one full cycle in ms
    const totalWidth = testimonials.length * 100; // Total width in percentage

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      if (animationPaused) {
        startTime = timestamp - (position / totalWidth) * duration;
        animationId = requestAnimationFrame(animate);
        return;
      }

      const elapsed = timestamp - startTime;
      const newPosition = ((elapsed % duration) / duration) * totalWidth;
      setPosition(newPosition);

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [testimonials.length, animationPaused]);

  // Pause animation on hover
  const handleMouseEnter = () => {
    setAnimationPaused(true);
  };

  const handleMouseLeave = () => {
    setAnimationPaused(false);
  };

  // Function to handle spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const spotlight = card.querySelector(".spotlight") as HTMLElement;
    if (spotlight) {
      spotlight.style.setProperty("--x", `${x}%`);
      spotlight.style.setProperty("--y", `${y}%`);
    }
  };

  // Intersection Observer for scroll animations
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  return (
    <section
      id="testimonials"
      className="section-spacing gradient-bg"
      ref={sectionRef}
    >
      <div className="container-custom">
        <div className="mb-16">
          <h2 className="section-heading">
            <span className="heading-decoration"></span>WHAT OUR CLIENTS SAY
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="testimonial-carousel-container"
          ref={sliderRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="testimonial-carousel"
            style={{
              transform: `translateX(-${position}%)`,
              // width: `${
              //   testimonials.length * 2 * (100 / testimonials.length)
              // }%`, // double width
              display: "flex",
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-item"
                style={{ width: `${100 / testimonials.length}%` }}
              >
                <div
                  className="testimonial-card mx-4"
                  onMouseMove={handleMouseMove}
                >
                  <div className="spotlight"></div>
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-xl mb-8">"{testimonial.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
