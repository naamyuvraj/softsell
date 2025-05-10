"use client"

import type React from "react"

import { motion, useAnimation } from "framer-motion"
import { ShieldCheck, Clock, DollarSign, Users } from "lucide-react"
import { useEffect, useRef } from "react"

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Secure Transactions",
      description: "End-to-end encryption and secure transfer protocols protect your data and licenses.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Fast Processing",
      description: "Get valuations within 24 hours and payment within 3 business days of acceptance.",
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Competitive Pricing",
      description: "Our market analysis ensures you get the best possible value for your licenses.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Support",
      description: "Our team of licensing specialists is available to guide you through the process.",
    },
  ]

  // Function to handle spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    const spotlight = card.querySelector(".spotlight") as HTMLElement
    if (spotlight) {
      spotlight.style.setProperty("--x", `${x}%`)
      spotlight.style.setProperty("--y", `${y}%`)
    }
  }

  // Intersection Observer for scroll animations
  const controls = useAnimation()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible")
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="about" className="section-spacing gradient-accent" ref={sectionRef}>
      <div className="container-custom">
        <div className="mb-16">
          <h2 className="section-heading">
            <span className="heading-decoration">Why Choose</span> What is SoftSell ?
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="feature-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {}}
            >
              <div className="spotlight"></div>
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
