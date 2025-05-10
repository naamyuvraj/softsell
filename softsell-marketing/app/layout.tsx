import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
})

export const metadata = {
  title: "SoftSell - Software License Resale Platform",
  description:
    "SoftSell helps businesses recover costs by reselling unused software licenses. Turn your idle digital assets into immediate cash flow.",
  keywords: "software resale, license reselling, software license marketplace, recover software costs",
  openGraph: {
    title: "SoftSell - Software License Resale Platform",
    description:
      "SoftSell helps businesses recover costs by reselling unused software licenses. Turn your idle digital assets into immediate cash flow.",
    url: "softsell-yuvraj.vercel.app",
    siteName: "SoftSell",
    images: [
      {
        url: "/public/logo.png",
        width: 1200,
        height: 630,
        alt: "SoftSell - Software License Reselling",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
