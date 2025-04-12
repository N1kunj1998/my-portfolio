'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa'
import { HiOutlineDownload } from 'react-icons/hi'
import MagneticNavLink from '../common/MagneticNavLink'

export default function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">Nikunj.dev</h1>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center space-x-6 font-medium">
              {links.map((link) => (
                <li key={link.name}>
                  <MagneticNavLink href={link.href} isActive={pathname === link.href}>
                    {link.name}
                  </MagneticNavLink>
                </li>
              ))}
              <li>
                <a
                  href="/NikunjKhakhkhar.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-[var(--foreground)] bg-transparent hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors duration-300"
                >
                  <HiOutlineDownload className="text-lg" />
                  Resume
                </a>
              </li>
            {mounted && (
              <button
                onClick={toggleTheme}
                className="ml-4 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-[var(--foreground)] bg-transparent hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors duration-300"
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
                {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
            )}
          </ul>

          {/* Hamburger Icon */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-xl"
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[var(--background)] text-[var(--foreground)] shadow-lg transform ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 z-50`}
      >
        <div className="p-4 flex justify-between items-center border-b border-[var(--foreground)]/20">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <FaTimes className="text-xl" />
          </button>
        </div>
        <ul className="flex flex-col gap-4 p-4 font-medium">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`block hover:text-[var(--accent)] transition ${
                  pathname === link.href ? 'font-semibold text-[var(--accent)]' : ''
                }`}
                onClick={() => setMenuOpen(false)} // close sidebar on click
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="/NikunjKhakhkhar.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-[var(--foreground)] bg-transparent hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors duration-300"
            >
              <HiOutlineDownload className="text-lg" />
              Resume
            </a>
          </li>
          {mounted && (
            <button
              onClick={toggleTheme}
              className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-[var(--foreground)] bg-transparent hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors duration-300"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          )}
        </ul>
      </div>

      {/* Optional overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}
