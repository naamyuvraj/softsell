"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function Faq() {
  const faqs = [
    {
      question: "What types of software licenses can I sell?",
      answer:
        "We accept a wide range of enterprise software licenses, including but not limited to: productivity suites, design software, development tools, security solutions, CRM platforms, and cloud service subscriptions. Our platform specializes in business and enterprise licenses rather than consumer software.",
    },
    {
      question: "How is the value of my licenses determined?",
      answer:
        "Our valuation process considers multiple factors: current market demand, original purchase price, remaining subscription time, number of seats/users, software version, and transferability restrictions. We analyze real-time market data to ensure you receive the most competitive offer possible.",
    },
    {
      question: "Is selling unused software licenses legal?",
      answer:
        "Yes, selling unused software licenses is legal in most jurisdictions under the first-sale doctrine, provided the license agreement allows for transfer. Our compliance team reviews each license to ensure all transfers adhere to the specific terms of the license agreement and applicable laws.",
    },
    {
      question: "How long does the entire process take?",
      answer:
        "Typically, the process takes 3-7 business days from submission to payment. We provide valuations within 24 hours, and once you accept, the transfer and payment processing usually takes 2-5 additional business days, depending on the complexity of the license transfer.",
    },
    {
      question: "What payment methods do you support?",
      answer:
        "We offer multiple secure payment options including direct bank transfers, PayPal, wire transfers, and cryptocurrency payments. You can select your preferred method during the acceptance process, and all transactions are secured with enterprise-grade encryption.",
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section-spacing gradient-accent">
      <div className="container-custom">
        <div className="mb-16">
          <h2 className="section-heading">
            <span className="heading-decoration"></span>FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#25D366]" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
