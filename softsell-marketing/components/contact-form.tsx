"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { CheckCircle2, Mail, Phone, MapPin } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    licenseType: "",
    message: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    company: "",
    licenseType: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const licenseTypes = [
    "Enterprise Software",
    "Creative Suite",
    "Development Tools",
    "Cloud Services",
    "Security Software",
    "Other",
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required"
      isValid = false
    }

    if (!formData.licenseType) {
      newErrors.licenseType = "Please select a license type"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // In a real app, you would submit the form data to your backend here
      console.log("Form submitted:", formData)

      // Show success message
      setIsSubmitted(true)

      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        company: "",
        licenseType: "",
        message: "",
      })

      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
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
    <section id="contact" className="section-spacing gradient-accent" ref={sectionRef}>
      <div className="container-custom">
        <div className="mb-16">
          <h2 className="section-heading">
            <span className="heading-decoration">Get In Touch mm</span>Get in Touch
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div variants={itemVariants} className="contact-info-card">
            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-[#25D366]/10 rounded-full">
                  <Mail className="w-6 h-6 text-[#25D366]" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Email</p>
                  <p className="text-gray-600 dark:text-gray-400">naam.yuvraj@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 p-3 bg-[#25D366]/10 rounded-full">
                  <Phone className="w-6 h-6 text-[#25D366]" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Phone</p>
                  <p className="text-gray-600 dark:text-gray-400">+91 9153471582</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 p-3 bg-[#25D366]/10 rounded-full">
                  <MapPin className="w-6 h-6 text-[#25D366]" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Address</p>
                  <p className="text-gray-600 dark:text-gray-400">Pune, Maharashtra, 411047</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-lg mb-4">Ready to unlock the value of your unused software licenses?</p>
              <p className="text-gray-600 dark:text-gray-400">
                Fill out the form and we'll get back to you within 24 hours with a personalized valuation.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                <div className="mb-4 p-4 bg-[#25D366]/10 rounded-full">
                  <CheckCircle2 className="h-16 w-16 text-[#25D366]" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  Your message has been sent successfully. We'll get back to you shortly.
                </p>
                <button onClick={() => setIsSubmitted(false)} className="btn-primary">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="contact-form p-8 bg-white dark:bg-black border border-gray-200 dark:border-gray-800"
              >
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500 mb-4">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500 mb-4">{errors.email}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company Name *"
                    className={errors.company ? "border-red-500" : ""}
                  />
                  {errors.company && <p className="mt-1 text-sm text-red-500 mb-4">{errors.company}</p>}
                </div>

                <div>
                  <select
                    id="licenseType"
                    name="licenseType"
                    value={formData.licenseType}
                    onChange={handleChange}
                    className={errors.licenseType ? "border-red-500" : ""}
                  >
                    <option value="">Select License Type *</option>
                    {licenseTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.licenseType && <p className="mt-1 text-sm text-red-500 mb-4">{errors.licenseType}</p>}
                </div>

                <div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={4}
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Submit
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
