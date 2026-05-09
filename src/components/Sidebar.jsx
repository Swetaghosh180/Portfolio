import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiMailLine, RiMapPinLine,
  RiGithubLine, RiLinkedinBoxLine, RiInstagramLine,
} from 'react-icons/ri'

const links = [
  { to: '/',          label: 'About' },
  { to: '/resume',    label: 'Resume' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact',   label: 'Contact' },
]

const socials = [
  { icon: RiGithubLine,      href: 'https://github.com/',    color: '#f1f5f9' },
  { icon: RiLinkedinBoxLine, href: 'https://linkedin.com/',  color: '#0a66c2' },
  { icon: RiInstagramLine,   href: 'https://instagram.com/', color: '#e1306c' },
]

const stagger = { animate: { transition: { staggerChildren: 0.08 } } }
const fadeUp  = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true)

  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="hidden lg:flex"
      style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width: 300,
        flexDirection: 'column',
        padding: '1.8rem 1.4rem',
        gap: '1rem',
        overflowY: 'auto',
        zIndex: 50,
        background: 'rgba(8,12,24,0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* ── Profile Card ── */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        padding: '1.3rem',
        overflow: 'hidden',
      }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: expanded ? '1.1rem' : 0 }}>
          {/* Avatar */}
          <div style={{
            width: 72, height: 72, borderRadius: '16px', flexShrink: 0,
            background: '#161b2e',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontSize: '1.5rem', fontWeight: 900,
              background: 'linear-gradient(135deg,#6366f1,#a78bfa)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>SG</span>
          </div>

          {/* Name + badge */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontWeight: 800, fontSize: '1rem', color: '#f1f5f9', marginBottom: '0.4rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Sweta Ghosh
            </p>
            <span style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '7px',
              padding: '0.22rem 0.7rem',
              fontSize: '0.72rem', fontWeight: 600, color: '#cbd5e1',
              whiteSpace: 'nowrap',
            }}>
              Frontend Developer
            </span>
          </div>

          {/* Chevron */}
          <motion.button
            onClick={() => setExpanded(e => !e)}
            animate={{ rotate: expanded ? 0 : -90 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.28 }}
            style={{
              alignSelf: 'flex-start', flexShrink: 0,
              width: 28, height: 28, borderRadius: '8px',
              background: 'rgba(245,158,11,0.12)',
              border: '1px solid rgba(245,158,11,0.28)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#f59e0b',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.button>
        </div>

        {/* Collapsible details */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="sidebar-details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: '1rem' }} />

              {/* Contact rows */}
              <motion.div variants={stagger} initial="initial" animate="animate"
                style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
                {[
                  { icon: RiMailLine,   label: 'EMAIL',    value: 'sweta@email.com' },
                  { icon: RiMapPinLine, label: 'LOCATION', value: 'India' },
                ].map(({ icon: Icon, label, value }) => (
                  <motion.div key={label} variants={fadeUp}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: '9px', flexShrink: 0,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={15} color="#94a3b8" />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: '0.6rem', color: '#475569', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.05rem' }}>{label}</p>
                      <p style={{ fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: '0.9rem' }} />

              {/* Socials */}
              <div style={{ display: 'flex', gap: '0.55rem' }}>
                {socials.map(({ icon: Icon, href, color }, i) => (
                  <motion.a key={i} href={href} target="_blank" rel="noreferrer"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.08 * i, type: 'spring', stiffness: 280 }}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.88 }}
                    style={{
                      width: 34, height: 34, borderRadius: '9px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#64748b', textDecoration: 'none', transition: 'color 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = `${color}50` }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Nav Links ── */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        {links.map(({ to, label }, i) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.07, duration: 0.35 }}
          >
            <NavLink to={to} end
              style={({ isActive }) => ({
                display: 'block',
                padding: '0.65rem 1rem',
                borderRadius: '10px',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.9rem',
                textDecoration: 'none',
                color: isActive ? '#f59e0b' : '#94a3b8',
                background: isActive ? 'rgba(245,158,11,0.08)' : 'transparent',
                borderLeft: isActive ? '3px solid #f59e0b' : '3px solid transparent',
                transition: 'all 0.2s',
              })}
              onMouseEnter={e => { if (!e.currentTarget.style.color.includes('245')) { e.currentTarget.style.color = '#f1f5f9'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' } }}
              onMouseLeave={e => { if (!e.currentTarget.style.color.includes('245')) { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent' } }}
            >
              {label}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
        <p style={{ fontSize: '0.7rem', color: '#334155', textAlign: 'center' }}>
          © 2025 Sweta Ghosh
        </p>
      </div>
    </motion.aside>
  )
}
