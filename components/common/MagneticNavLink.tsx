'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticNavLinkProps {
  href: string
  children: React.ReactNode
  isActive?: boolean
}

export default function MagneticNavLink({ href, children, isActive }: MagneticNavLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const bounds = linkRef.current?.getBoundingClientRect()
    if (!bounds) return

    const relX = e.clientX - bounds.left - bounds.width / 2
    const relY = e.clientY - bounds.top - bounds.height / 2

    x.set(relX * 0.15)
    y.set(relY * 0.15)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.12 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Link
        href={href}
        ref={linkRef}
        className={`px-2 py-1 relative inline-block transition-all duration-300 
          text-[var(--foreground)] hover:text-[var(--accent)] 
          ${isActive ? 'font-semibold text-[var(--accent)]' : ''}`}
      >
        {children}
      </Link>
    </motion.div>
  )
}
