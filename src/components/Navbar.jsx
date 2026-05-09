import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  RiCodeSSlashLine,
  RiUser3Line, RiFileList3Line, RiBriefcase4Line, RiMailLine,
} from 'react-icons/ri'

const links = [
  { to: '/',          label: 'About',     icon: RiUser3Line },
  { to: '/resume',    label: 'Resume',    icon: RiFileList3Line },
  { to: '/portfolio', label: 'Portfolio', icon: RiBriefcase4Line },
  { to: '/contact',   label: 'Contact',   icon: RiMailLine },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      {/* ── Desktop / Tablet — TOP ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="top-navbar"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? 'rgba(10,15,30,0.94)' : 'rgba(10,15,30,0.6)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          borderBottom: scrolled
            ? '1px solid rgba(99,102,241,0.18)'
            : '1px solid rgba(255,255,255,0.06)',
          boxShadow: scrolled
            ? '0 4px 48px rgba(0,0,0,0.5), 0 1px 0 rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.03)'
            : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {scrolled && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(167,139,250,0.4), transparent)',
            pointerEvents: 'none',
          }} />
        )}

        <div style={{
          maxWidth: 1100, margin: '0 auto',
          padding: '0 1.75rem', height: 66,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <motion.div
              whileHover={{ scale: 1.1, rotate: -8 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 450, damping: 14 }}
              style={{
                width: 36, height: 36, borderRadius: '10px',
                background: 'linear-gradient(135deg,#6366f1,#4f46e5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(99,102,241,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              <RiCodeSSlashLine size={17} color="#fff" />
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontWeight: 800, fontSize: '1rem', color: '#f1f5f9', letterSpacing: '-0.025em' }}>
                Sweta<span style={{ color: '#6366f1' }}>.</span>
              </span>
              <span style={{ fontSize: '0.6rem', color: '#475569', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.1rem' }}>
                Frontend Dev
              </span>
            </div>
          </NavLink>

          {/* Nav links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
            {links.map(({ to, label }) => {
              const isActive = location.pathname === to || (to === '/' && location.pathname === '/about')
              return (
                <NavLink key={to} to={to} end
                  style={{
                    textDecoration: 'none',
                    padding: '0.45rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#f1f5f9' : '#64748b',
                    background: 'transparent',
                    transition: 'color 0.22s ease',
                    letterSpacing: '-0.01em',
                    position: 'relative',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.color = '#e2e8f0'
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.color = '#64748b'
                  }}
                >
                  {label}
                  {/* Clean gradient underline — active only, no dot */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute',
                        bottom: 2, left: '12%', right: '12%',
                        height: 2, borderRadius: '2px',
                        background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
                        boxShadow: '0 0 8px rgba(99,102,241,0.5)',
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </NavLink>
              )
            })}
          </nav>
        </div>
      </motion.header>

      {/* ── Mobile — BOTTOM ── */}
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="bottom-navbar"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
          background: 'rgba(10,15,30,0.95)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: 62,
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          boxShadow: '0 -8px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* Top glow line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), rgba(167,139,250,0.25), transparent)',
          pointerEvents: 'none',
        }} />

        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end
            style={({ isActive }) => ({
              flex: 1,
              textDecoration: 'none',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '0.18rem',
              height: '100%',
              color: isActive ? '#818cf8' : '#475569',
              position: 'relative',
              transition: 'color 0.2s ease',
            })}
          >
            {({ isActive }) => (
              <>
                {/* Clean top bar — no dot */}
                {isActive && (
                  <motion.div
                    layoutId="mob-bar"
                    style={{
                      position: 'absolute', top: 0, left: '25%', right: '25%',
                      height: 2, borderRadius: '0 0 3px 3px',
                      background: 'linear-gradient(90deg,#6366f1,#a78bfa)',
                      boxShadow: '0 0 8px rgba(99,102,241,0.55)',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <motion.div
                  animate={{ scale: isActive ? 1.1 : 1, y: isActive ? -1 : 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                >
                  <Icon size={20} />
                </motion.div>
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: '0.02em',
                }}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </motion.nav>
    </>
  )
}
