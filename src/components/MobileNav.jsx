import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const links = [
  { to: '/',          label: 'About' },
  { to: '/resume',    label: 'Resume' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact',   label: 'Contact' },
]

export default function MobileNav() {
  return (
    <motion.nav
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="md:hidden"
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(10,14,26,0.88)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0.75rem 0.5rem',
        paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
      }}
    >
      {links.map(({ to, label }) => (
        <NavLink key={to} to={to} end
          style={({ isActive }) => ({
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: isActive ? 700 : 500,
            color: isActive ? '#f59e0b' : '#94a3b8',
            transition: 'color 0.2s',
            padding: '0.2rem 0.4rem',
            position: 'relative',
          })}
        >
          {({ isActive }) => (
            <>
              {label}
              {isActive && (
                <motion.div
                  layoutId="mob-underline"
                  style={{
                    position: 'absolute', bottom: -4, left: 0, right: 0,
                    height: 2, borderRadius: 2, background: '#f59e0b',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </>
          )}
        </NavLink>
      ))}
    </motion.nav>
  )
}
