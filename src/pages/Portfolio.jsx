import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import ProjectCard from '../components/ProjectCard'

const ease = [0.22, 1, 0.36, 1]

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease },
})

const projects = [
  {
    id: 1,
    title: "Shweta's Kitchen Recipe | Recipe Website",
    description: 'Dynamic multi-page recipe website with multilingual support for 9 Indian languages, CSS animations, glassmorphism effects, and mobile-first responsive layout.',
    image: 'https://placehold.co/600x360/0d1220/f59e0b?text=Kitchen+Recipe',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    category: 'JavaScript',
    github: 'https://github.com/Swetaghosh180/Shwetas_Kitchen-PremiumRecipes',
    demo: 'https://swetaghosh180.github.io/Shwetas_Kitchen-PremiumRecipes/',
  },
  {
    id: 2,
    title: 'Aurelia Luxe | Luxury Jewelry E-Commerce Website',
    description: 'Modern frontend developer portfolio using React and Tailwind CSS with modular component-based architecture, React Router, and mobile-first responsive design.',
    image: 'https://placehold.co/600x360/0d1220/a78bfa?text=Portfolio',
    tags: ['React', 'Tailwind CSS', 'JavaScript'],
    category: 'JavaScript',
    github: 'https://github.com/Swetaghosh180/',
    demo: '#',
  },
  {
    id: 3,
    title: 'Portfolio Website | Frontend Developer Portfolio',
    description: 'Modern frontend developer portfolio using React and Tailwind CSS with modular component-based architecture, React Router, and mobile-first responsive design.',
    image: 'https://placehold.co/600x360/0d1220/a78bfa?text=Portfolio',
    tags: ['React', 'Tailwind CSS', 'JavaScript'],
    category: 'React',
    github: '#',
    demo: '#',
  },
  {
    id: 4,
    title: 'eBhakti — Digital Scripture Library',
    description: 'Devotional reading platform built with Vue 3 SPA architecture, multilingual support for 5 Indian languages, premium editorial UI, and dynamic scripture routing.',
    image: 'https://placehold.co/600x360/0d1220/f97316?text=eBhakti',
    tags: ['Vue.js', 'Vue Router', 'Tailwind CSS'],
    category: 'Vue',
    github: '#',
    demo: '#',
  },
]

const filters = ['All', 'React', 'Vue', 'JavaScript']

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <PageWrapper>
      <div className="page-content">

        {/* Header */}
        <motion.div {...up(0)} style={{ marginBottom: '2.5rem' }}>
          <p className="section-label">My work</p>
          <h1 className="section-title">
            Featured <span className="gradient-text-2">Projects</span>
          </h1>
          <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.8, maxWidth: 480, marginTop: '0.5rem' }}>
            A curated selection of projects built with passion, precision, and modern tooling.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div {...up(0.1)} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {filters.map(f => {
            const isActive = active === f
            return (
              <motion.button
                key={f}
                onClick={() => setActive(f)}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                style={{
                  padding: '0.48rem 1.25rem',
                  borderRadius: '999px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  border: isActive ? '1px solid rgba(99,102,241,0.45)' : '1px solid rgba(255,255,255,0.07)',
                  background: isActive
                    ? 'linear-gradient(135deg,#6366f1,#4f46e5)'
                    : 'rgba(255,255,255,0.03)',
                  color: isActive ? '#fff' : '#64748b',
                  boxShadow: isActive
                    ? '0 4px 20px rgba(99,102,241,0.45), inset 0 1px 0 rgba(255,255,255,0.15)'
                    : 'none',
                  letterSpacing: '-0.01em',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {f}
                {isActive && (
                  <motion.div
                    layoutId="filter-bg"
                    style={{
                      position: 'absolute', inset: 0, borderRadius: '999px',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1), transparent)',
                      pointerEvents: 'none',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.3rem' }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -12 }}
                transition={{ duration: 0.38, delay: i * 0.06, ease }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </PageWrapper>
  )
}
