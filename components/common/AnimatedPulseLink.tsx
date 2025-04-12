'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function AnimatedPulseLink() {
  const [initialPulses, setInitialPulses] = useState(3)
  const [showPulse, setShowPulse] = useState(true)
  const { ref, inView } = useInView({ threshold: 0.6 })

  // Count initial pulses and stop after a few
  useEffect(() => {
    if (initialPulses > 0) {
      const timer = setTimeout(() => setInitialPulses((prev) => prev - 1), 2500)
      return () => clearTimeout(timer)
    } else {
      setShowPulse(false)
    }
  }, [initialPulses])

  // Re-trigger pulse when in view
  useEffect(() => {
    if (inView && !showPulse) {
      setShowPulse(true)
      const timer = setTimeout(() => setShowPulse(false), 2500)
      return () => clearTimeout(timer)
    }
  }, [inView])

  return (
    <div ref={ref} className="mt-6 relative inline-block group">
      {showPulse && (
        <span className="absolute -inset-0.5 rounded-full bg-[var(--accent)] opacity-50 blur-sm animate-slow-ping group-hover:opacity-75 group-hover:blur-md transition"></span>
      )}

      <Link
        href="/contact"
        className="relative z-10 inline-block bg-[var(--accent)] text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200 ease-in-out"
      >
        Let’s Connect
      </Link>
    </div>
  )
}
