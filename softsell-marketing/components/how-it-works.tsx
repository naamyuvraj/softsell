"use client"

import type React from "react"

import { motion, useAnimation } from "framer-motion"
import { Upload, DollarSign, CheckCircle } from "lucide-react"
import { useEffect, useRef } from "react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Upload License",
      description: "Submit your unused software license details through our secure portal.",
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Get Valuation",
      description: "Receive a competitive market valuation within 24 hours based on current demand.",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Get Paid",
      description: "Accept our offer and get paid quickly via your preferred payment method.",
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
    <section id="how-it-works" className="section-spacing gradient-bg" ref={sectionRef}>
      <div className="container-custom">
        <div className="mb-16">
          <h2 className="section-heading">
            <span className="heading-decoration"></span>HOW IT WORKS
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="feature-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {}}
            >
              <div className="spotlight"></div>
              <div className="mb-6">{step.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
