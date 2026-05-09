import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SkillCard({ icon: Icon, label, color = '#6366f1' }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -7, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 380, damping: 20 }}
      style={{
        background: hovered ? `${color}0d` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? `${color}45` : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '14px',
        padding: '1rem 0.5rem 0.9rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.65rem',
        cursor: 'default',
        transition: 'background 0.3s, border-color 0.3s',
        position: 'relative', overflow: 'hidden',
        boxShadow: hovered ? `0 8px 28px ${color}22, 0 0 0 1px ${color}18` : 'none',
      }}
    >
      {/* Ambient glow bg */}
      <div style={{
        position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)',
        width: 70, height: 70, borderRadius: '50%',
        background: `${color}18`, filter: 'blur(20px)',
        pointerEvents: 'none',
        opacity: hovered ? 1 : 0.5,
        transition: 'opacity 0.3s',
      }} />

      {/* Top shimmer line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: hovered
          ? `linear-gradient(90deg, transparent, ${color}60, transparent)`
          : 'transparent',
        transition: 'background 0.3s',
        pointerEvents: 'none',
      }} />

      <motion.div
        animate={hovered ? { rotate: [0, -10, 10, -5, 0], y: -2 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{
          width: 48, height: 48, borderRadius: '13px',
          background: `${color}18`,
          border: `1px solid ${color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', zIndex: 1,
          boxShadow: hovered ? `0 4px 16px ${color}30` : 'none',
          transition: 'box-shadow 0.3s',
        }}
      >
        <Icon size={24} color={color} />
      </motion.div>

      <span style={{
        fontSize: '0.68rem', fontWeight: 700,
        color: hovered ? color : '#64748b',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        position: 'relative', zIndex: 1,
        transition: 'color 0.3s',
      }}>
        {label}
      </span>
    </motion.div>
  )
}
