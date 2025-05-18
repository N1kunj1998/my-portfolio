'use client'
import AboutPreview from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'
import HeroSection from '@/components/sections/HeroSection'
import LatestBlogSection from '@/components/sections/LatestBlogSection'
import ProjectsPreview from '@/components/sections/ProjectsSection'
import TimelineSection from '@/components/sections/TimelineSection'

export default function HomePage() {
  return (
    <main className="space-y-32">
      <HeroSection />
      <AboutPreview />
      <TimelineSection />
      <ProjectsPreview />
      <LatestBlogSection />
      <ContactSection />
    </main>
  )
}
