"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  const stats = [
    { value: 5000, label: "Businesses", suffix: "+" },
    { value: 50, label: "Million Saved", prefix: "$", suffix: "M+" },
    { value: 98, label: "Satisfaction Rate", suffix: "%" },
    { value: 24, label: "Hour Response", suffix: "h" },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          controls.start("visible")
        }
      },
      { threshold: 0.1 },
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
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

  // Function to animate counting up
  const AnimatedCounter = ({ value, prefix = "", suffix = "" }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (isVisible) {
        let start = 0
        const end = Number.parseInt(value.toString(), 10)
        const duration = 2000
        const increment = end / (duration / 16)

        const timer = setInterval(() => {
          start += increment
          setCount(Math.min(Math.floor(start), end))

          if (start >= end) {
            clearInterval(timer)
          }
        }, 16)

        return () => {
          clearInterval(timer)
        }
      }
    }, [isVisible, value])

    return (
      <span className="stats-number">
        {prefix}
        {count}
        {suffix}
      </span>
    )
  }

  return (
    <section className="section-spacing gradient-accent" ref={statsRef}>
      <div className="container-custom">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} className="stats-item" variants={itemVariants}>
              <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <p className="text-lg font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
