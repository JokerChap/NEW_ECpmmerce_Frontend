import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import styles from "./layout.module.css"
import './globals.css';      
import CustomCursor from "@/components/CustomCursor"



const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StyleHub - Premium Fashion Store",
  description: "Discover premium clothing and fashion items",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} ${styles.body}`}>
        <Navigation />
        <CustomCursor />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
