import Header from "@/components/header"
import Hero from "@/components/hero"
import HowItWorks from "@/components/how-it-works"
import WhyChooseUs from "@/components/why-choose-us"
import Testimonials from "@/components/testimonials"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import FeatureImage from "@/components/feature-image"
import Stats from "@/components/stats"
import Faq from "@/components/faq"
import ChatWidget from "@/components/chat-widget"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <Hero />
        <FeatureImage />
        <HowItWorks />
        <Stats />
        <WhyChooseUs />
        <Testimonials />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
