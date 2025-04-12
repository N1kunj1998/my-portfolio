'use client'
import './globals.css'
import Navbar from '../components/layout/NavBar'
import { ThemeProvider } from 'next-themes'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
