import { useState, useRef } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { RiGithubLine, RiExternalLinkLine } from 'react-icons/ri'

export default function ProjectCard({ project }) {
  const { title, description, image, tags, github, demo } = project
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)

  const rotateX = useSpring(0, { stiffness: 200, damping: 22 })
  const rotateY = useSpring(0, { stiffness: 200, damping: 22 })
  const glowX   = useSpring(50, { stiffness: 150, damping: 20 })
  const glowY   = useSpring(50, { stiffness: 150, damping: 20 })

  const onMouseMove = e => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top)  / rect.height
    rotateX.set((py - 0.5) * -10)
    rotateY.set((px - 0.5) *  10)
    glowX.set(px * 100)
    glowY.set(py * 100)
  }
  const onMouseLeave = () => {
    rotateX.set(0); rotateY.set(0)
    glowX.set(50);  glowY.set(50)
    setHovered(false)
  }

  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(99,102,241,0.12) 0%, transparent 65%)`
  )

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX, rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 900,
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? 'rgba(99,102,241,0.32)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '20px',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column', height: '100%',
        boxShadow: hovered
          ? '0 0 0 1px rgba(99,102,241,0.15), 0 32px 72px rgba(99,102,241,0.18), 0 8px 24px rgba(0,0,0,0.4)'
          : '0 4px 24px rgba(0,0,0,0.25)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        position: 'relative',
        willChange: 'transform',
      }}
    >
      {/* Dynamic glow layer */}
      <motion.div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: glowBg, borderRadius: 'inherit',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
      }} />

      {/* Top shimmer line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: hovered
          ? 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(167,139,250,0.4), transparent)'
          : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
        transition: 'background 0.35s',
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* Image */}
      <div style={{ height: 185, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
        <motion.img
          src={image} alt={title}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,15,30,0.95) 0%, rgba(10,15,30,0.3) 50%, transparent 100%)',
        }} />
        {/* Hover CTA overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, backdropFilter: hovered ? 'blur(4px)' : 'blur(0px)' }}
          transition={{ duration: 0.28 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(10,15,30,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
          }}
        >
          {github && (
            <motion.a href={github} target="_blank" rel="noreferrer"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
              transition={{ delay: 0.05, duration: 0.25 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: 'rgba(10,15,30,0.9)', color: '#f1f5f9',
                padding: '0.5rem 1.1rem', borderRadius: '9px',
                fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <RiGithubLine size={15} /> Code
            </motion.a>
          )}
          {demo && (
            <motion.a href={demo} target="_blank" rel="noreferrer"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
              transition={{ delay: 0.1, duration: 0.25 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: 'linear-gradient(135deg,#6366f1,#4f46e5)',
                color: '#fff', padding: '0.5rem 1.1rem', borderRadius: '9px',
                fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none',
                boxShadow: '0 4px 18px rgba(99,102,241,0.55)',
              }}
            >
              <RiExternalLinkLine size={15} /> Live Demo
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Body */}
      <div style={{ padding: '1.3rem', display: 'flex', flexDirection: 'column', gap: '0.7rem', flex: 1, position: 'relative', zIndex: 1 }}>
        <h3 style={{
          fontWeight: 700, fontSize: '0.97rem',
          color: '#e2e8f0', letterSpacing: '-0.02em', lineHeight: 1.3,
        }}>{title}</h3>
        <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.8, flex: 1 }}>{description}</p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {tags.map(t => (
            <span key={t} style={{
              background: 'rgba(99,102,241,0.1)',
              color: '#a78bfa',
              border: '1px solid rgba(99,102,241,0.2)',
              padding: '0.2rem 0.65rem',
              borderRadius: '999px',
              fontSize: '0.67rem',
              fontWeight: 600,
              letterSpacing: '0.03em',
              transition: 'all 0.2s',
            }}>{t}</span>
          ))}
        </div>

        {/* Bottom links */}
        <div style={{ display: 'flex', gap: '0.55rem', paddingTop: '0.15rem' }}>
          {github && (
            <a href={github} target="_blank" rel="noreferrer"
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                padding: '0.5rem', borderRadius: '9px', fontSize: '0.78rem', fontWeight: 600,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                color: '#64748b', textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#f1f5f9'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
            >
              <RiGithubLine size={14} /> GitHub
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noreferrer"
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                padding: '0.5rem', borderRadius: '9px', fontSize: '0.78rem', fontWeight: 600,
                background: 'linear-gradient(135deg,#6366f1,#4f46e5)',
                color: '#fff', textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 22px rgba(99,102,241,0.6)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(99,102,241,0.3)'}
            >
              <RiExternalLinkLine size={14} /> Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
