import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiArrowUpLine } from 'react-icons/ri'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 320)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 16 }}
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          whileHover={{ scale: 1.14, y: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed', bottom: '5rem', right: '1.25rem', zIndex: 99,
            width: 44, height: 44, borderRadius: '13px', border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#6366f1,#4f46e5)',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 24px rgba(99,102,241,0.55), 0 0 0 1px rgba(99,102,241,0.35)',
          }}
        >
          {/* Pulse ring */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '13px',
            border: '1px solid rgba(99,102,241,0.5)',
            animation: 'pulseRing 2s ease-out infinite',
            pointerEvents: 'none',
          }} />
          <RiArrowUpLine size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
