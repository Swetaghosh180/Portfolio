import { useState, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import {
  RiMailLine, RiMapPinLine, RiSendPlaneLine,
  RiGithubLine, RiLinkedinBoxLine, RiInstagramLine,
} from 'react-icons/ri'

const ease = [0.22, 1, 0.36, 1]

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease },
})

const socials = [
  { icon: RiGithubLine,      label: 'GitHub',    href: 'https://github.com/Swetaghosh180',    color: '#f1f5f9' },
  { icon: RiLinkedinBoxLine, label: 'LinkedIn',  href: 'https://linkedin.com/swetaghosh05',  color: '#0a66c2' },
  { icon: RiInstagramLine,   label: 'Instagram', href: 'https://instagram.com/ms.swetaghosh', color: '#e1306c' },
  { icon: RiMailLine,        label: 'Email',     href: 'mailto:swetaghosh665@gmail.com', color: '#6366f1' },
]

/* Magnetic hook */
function useMagnetic(strength = 0.35) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 200, damping: 18 })
  const y = useSpring(0, { stiffness: 200, damping: 18 })
  const onMove = e => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width  / 2) * strength)
    y.set((e.clientY - rect.top  - rect.height / 2) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  return { ref, x, y, onMove, onLeave }
}

/* Floating label field */
function FloatField({ label, name, type = 'text', value, onChange, textarea, rows = 5 }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className="float-field">
      <Tag
        name={name}
        type={!textarea ? type : undefined}
        value={value}
        onChange={onChange}
        required
        placeholder=" "
        rows={textarea ? rows : undefined}
      />
      <label>{label}</label>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const sendBtn = useMagnetic(0.4)

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = e => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false); setSent(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 5500)
    }, 1400)
  }

  return (
    <PageWrapper>
      <div className="page-content">

        {/* Header */}
        <motion.div {...up(0)} style={{ marginBottom: '3rem' }}>
          <p className="section-label">Say hello</p>
          <h1 className="section-title">
            Get In <span className="gradient-text-2">Touch</span>
          </h1>
          <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.8, maxWidth: 460, marginTop: '0.5rem' }}>
            Open to freelance projects and full-time opportunities.
            Let's build something exceptional together.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '2rem' }}>

          {/* Left — info */}
          <motion.div {...up(0.1)} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

            {/* Contact info cards */}
            {[
              { icon: RiMailLine,   label: 'Email',    value: 'swetaghosh665@gmail.com',      color: '#6366f1' },
              { icon: RiMapPinLine, label: 'Location', value: 'Jharkhand, India', color: '#22c55e' },
            ].map(({ icon: Icon, label, value, color }) => (
              <motion.div key={label}
                whileHover={{ x: 5, boxShadow: `0 8px 28px ${color}12` }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '16px',
                  padding: '1.1rem 1.25rem',
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  transition: 'border-color 0.25s',
                  position: 'relative', overflow: 'hidden',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${color}30`}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
              >
                {/* Left accent bar */}
                <div style={{
                  position: 'absolute', left: 0, top: '20%', bottom: '20%',
                  width: 2, borderRadius: 2,
                  background: `linear-gradient(to bottom, ${color}, ${color}50)`,
                  boxShadow: `0 0 8px ${color}60`,
                }} />
                <div style={{
                  width: 44, height: 44, borderRadius: '12px',
                  background: `${color}12`, border: `1px solid ${color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  boxShadow: `0 4px 16px ${color}18`,
                }}>
                  <Icon size={19} color={color} />
                </div>
                <div>
                  <p style={{ fontSize: '0.67rem', color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{label}</p>
                  <p style={{ fontSize: '0.88rem', color: '#cbd5e1', fontWeight: 600, marginTop: '0.12rem', letterSpacing: '-0.01em' }}>{value}</p>
                </div>
              </motion.div>
            ))}

            {/* Socials */}
            <div>
              <p style={{ fontSize: '0.67rem', color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.9rem' }}>
                Find me on
              </p>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                {socials.map(({ icon: Icon, label, href, color }, i) => (
                  <motion.a key={label} href={href} target="_blank" rel="noreferrer" title={label}
                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * i, type: 'spring', stiffness: 300, damping: 18 }}
                    whileHover={{ y: -5, scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: 44, height: 44, borderRadius: '12px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#475569', textDecoration: 'none',
                      transition: 'color 0.2s, border-color 0.2s, background 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = color
                      e.currentTarget.style.borderColor = `${color}45`
                      e.currentTarget.style.background = `${color}12`
                      e.currentTarget.style.boxShadow = `0 4px 18px ${color}30`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = '#475569'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Branding quote */}
            <motion.div
              whileHover={{ borderColor: 'rgba(99,102,241,0.3)', boxShadow: '0 8px 28px rgba(99,102,241,0.08)' }}
              transition={{ duration: 0.3 }}
              style={{
                marginTop: 'auto',
                padding: '1.15rem 1.25rem',
                background: 'rgba(99,102,241,0.05)',
                border: '1px solid rgba(99,102,241,0.14)',
                borderRadius: '16px',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Decorative quote mark */}
              <div style={{
                position: 'absolute', top: -8, left: 12,
                fontSize: '4rem', color: 'rgba(99,102,241,0.08)',
                fontFamily: 'Georgia, serif', lineHeight: 1, pointerEvents: 'none',
                userSelect: 'none',
              }}>"</div>
              <p style={{ fontSize: '0.83rem', color: '#94a3b8', lineHeight: 1.75, fontStyle: 'italic', position: 'relative' }}>
                I turn ideas into pixel-perfect, performant web experiences.
              </p>
              <p style={{ fontSize: '0.72rem', color: '#6366f1', fontWeight: 700, marginTop: '0.6rem' }}>— Sweta Ghosh</p>
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.div {...up(0.2)}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px',
              padding: '1.85rem',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Top shimmer */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), rgba(167,139,250,0.25), transparent)',
              pointerEvents: 'none',
            }} />

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                style={{ textAlign: 'center', padding: '3rem 1rem' }}
              >
                <motion.div
                  animate={{ rotate: [0, -12, 12, -6, 0], scale: [1, 1.25, 1] }}
                  transition={{ duration: 0.7 }}
                  style={{ fontSize: '3.5rem', marginBottom: '1.25rem' }}
                >🎉</motion.div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ delay: 0.3, duration: 0.5, ease }}
                  style={{
                    height: 3, background: 'linear-gradient(90deg,#22c55e,#4ade80)',
                    borderRadius: 3, margin: '0 auto 1.25rem',
                    boxShadow: '0 0 12px rgba(34,197,94,0.5)',
                  }}
                />
                <h3 style={{ fontWeight: 800, color: '#22c55e', fontSize: '1.2rem', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>
                  Message Sent!
                </h3>
                <p style={{ color: '#475569', fontSize: '0.87rem', lineHeight: 1.75 }}>
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <FloatField label="Your Name"    name="name"    value={form.name}    onChange={onChange} />
                <FloatField label="Email Address" name="email"  type="email" value={form.email}   onChange={onChange} />
                <FloatField label="Your Message" name="message" value={form.message} onChange={onChange} textarea rows={5} />

                {/* Magnetic send button */}
                <motion.div
                  ref={sendBtn.ref}
                  onMouseMove={sendBtn.onMove}
                  onMouseLeave={sendBtn.onLeave}
                  style={{ x: sendBtn.x, y: sendBtn.y, marginTop: '0.25rem' }}
                >
                  <motion.button
                    type="submit"
                    className="btn-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ justifyContent: 'center', width: '100%', opacity: loading ? 0.75 : 1 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span style={{
                          width: 15, height: 15,
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: '#fff',
                          borderRadius: '50%',
                          animation: 'spin 0.7s linear infinite',
                          display: 'inline-block',
                        }} />
                        Sending...
                      </>
                    ) : (
                      <><RiSendPlaneLine size={16} /> Send Message</>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </PageWrapper>
  )
}
