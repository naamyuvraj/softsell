"use client"

import { motion } from "framer-motion"

export default function FeatureImage() {
  return (
    <section className="py-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="full-width-image"
      >
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
          alt="Software license management platform"
          className="w-full h-full object-cover"
        />
        <div className="full-width-image-overlay">
          <div className="container-custom">
            <div className="max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-6 text-white"
              >
                Maximize Your Software Investment
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-xl text-white/90 mb-8"
              >
                Our platform connects businesses with unused software licenses to buyers seeking cost-effective
                solutions, creating a win-win marketplace that optimizes IT spending.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <a href="#contact" className="btn-primary">
                  Start Selling
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
