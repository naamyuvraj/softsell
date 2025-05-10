"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot } from "lucide-react"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! How can I help you with software license reselling today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample questions for the user to click on
  const sampleQuestions = [
    "How do I sell my license?",
    "What types of licenses do you accept?",
    "How long does the process take?",
    "How is payment handled?",
  ]

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate API response with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simple response logic based on keywords
      let response: string

      if (content.toLowerCase().includes("sell")) {
        response =
          "To sell your license, simply click the 'Get Started' button at the top of our page. You'll need to provide details about your license, and we'll get back to you with a valuation within 24 hours."
      } else if (content.toLowerCase().includes("type")) {
        response =
          "We accept a wide range of software licenses, including enterprise software, creative suites, development tools, cloud services, and security software. If you're unsure about your specific license, please contact us for verification."
      } else if (content.toLowerCase().includes("time") || content.toLowerCase().includes("long")) {
        response =
          "The entire process typically takes 3-5 business days from submission to payment. We provide valuations within 24 hours, and once you accept, payment is processed within 2-3 business days."
      } else if (content.toLowerCase().includes("payment") || content.toLowerCase().includes("pay")) {
        response =
          "We offer multiple payment methods including direct bank transfer, PayPal, and cryptocurrency. You can select your preferred method during the acceptance process. All transactions are secure and encrypted."
      } else {
        response =
          "Thank you for your question. Our team specializes in helping businesses recover value from unused software licenses. Could you provide more details about your specific needs so we can assist you better?"
      }

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating response:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(input)
    }
  }

  return (
    <>
      {/* Chat toggle button */}
      <div className="chat-widget-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </div>

      {/* Chat widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="chat-widget"
          >
            {/* Chat header */}
            <div className="chat-header">
              <Bot className="h-6 w-6 mr-2" />
              <div>
                <h3 className="font-bold">SoftSell Assistant</h3>
                <p className="text-xs opacity-80">We typically reply in a few seconds</p>
              </div>
            </div>

            {/* Chat messages */}
            <div className="chat-messages">
              {messages.map((message) => (
                <div key={message.id} className={`chat-message ${message.role === "user" ? "user" : "bot"}`}>
                  <p>{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
              {isLoading && (
                <div className="chat-message bot">
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Sample questions */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {sampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(question)}
                      className="text-xs bg-white dark:bg-gray-700 hover:bg-[#25D366]/10 dark:hover:bg-[#25D366]/10 text-gray-700 dark:text-gray-300 rounded-full px-3 py-1 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat input */}
            <div className="chat-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage(input)}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
