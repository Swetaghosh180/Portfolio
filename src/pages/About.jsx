import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import SkillCard from '../components/SkillCard'
import {
  RiMailLine, RiMapPinLine,
  RiGithubLine, RiLinkedinBoxLine, RiInstagramLine,
  RiCodeSSlashLine, RiSmartphoneLine, RiPaletteLine, RiSpeedLine,
} from 'react-icons/ri'
import { RiHtml5Line, RiCss3Line, RiJavascriptLine, RiReactjsLine } from 'react-icons/ri'
import { SiTailwindcss, SiGit, SiFigma, SiVuedotjs } from 'react-icons/si'
import profileImg from '../assets/images/Photo1.jpeg'

const tech = [
  { icon: RiHtml5Line,      label: 'HTML5',      color: '#e34f26' },
  { icon: RiCss3Line,       label: 'CSS3',       color: '#1572b6' },
  { icon: RiJavascriptLine, label: 'JavaScript', color: '#f7df1e' },
  { icon: SiVuedotjs,       label: 'Vue.js',     color: '#42b883' },
  { icon: RiReactjsLine,    label: 'React',      color: '#61dafb' },
  { icon: SiTailwindcss,    label: 'Tailwind',   color: '#06b6d4' },
  { icon: SiGit,            label: 'Git',        color: '#f05032' },
  { icon: SiFigma,          label: 'Figma',      color: '#f24e1e' },
]

const services = [
  { icon: RiCodeSSlashLine, title: 'Web Development',   desc: 'Building fast, responsive web apps with React and modern tooling.', color: '#6366f1' },
  { icon: RiPaletteLine,    title: 'UI/UX Design',      desc: 'Designing clean, intuitive interfaces focused on user experience.',  color: '#a78bfa' },
  { icon: RiSmartphoneLine, title: 'Responsive Design', desc: 'Pixel-perfect layouts that work seamlessly on all screen sizes.',    color: '#22c55e' },
  { icon: RiSpeedLine,      title: 'Performance',       desc: 'Optimizing for speed, SEO, and Core Web Vitals.',                   color: '#f59e0b' },
]

const socials = [
  { icon: RiGithubLine,      href: 'https://github.com/Swetaghosh180',    color: '#f1f5f9',  label: 'GitHub',    ionIcon: 'logo-github' },
  { icon: RiLinkedinBoxLine, href: 'https://linkedin.com/in/swetaghosh05',  color: '#0a66c2',  label: 'LinkedIn',  ionIcon: 'logo-linkedin' },
  { icon: RiInstagramLine,   href: 'https://instagram.com/ms.swetaghosh', color: '#e1306c',  label: 'Instagram', ionIcon: 'logo-instagram' },
]

const staggerContainer = { animate: { transition: { staggerChildren: 0.09 } } }
const fadeSlide = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

/* Section card */
function Card({ children, style = {}, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="shimmer-card"
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '22px',
        transition: 'border-color 0.35s, box-shadow 0.35s',
        position: 'relative', overflow: 'hidden',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.22)'
        e.currentTarget.style.boxShadow = '0 0 0 1px rgba(99,102,241,0.08), 0 20px 56px rgba(99,102,241,0.07), inset 0 1px 0 rgba(255,255,255,0.04)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
        pointerEvents: 'none',
      }} />
      {children}
    </motion.div>
  )
}

/* Section heading */
function SectionHeading({ children }) {
  return (
    <div style={{ marginBottom: '1.4rem' }}>
      <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '0.45rem', letterSpacing: '-0.025em' }}>
        {children}
      </h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: 3, background: 'linear-gradient(90deg,#f59e0b,#fbbf24)', borderRadius: 3, boxShadow: '0 0 10px rgba(245,158,11,0.35)' }}
      />
    </div>
  )
}

/* Service card — tilt only on desktop */
function ServiceCard({ icon: Icon, title, desc, color, index }) {
  const ref = useRef(null)
  const rotateX = useSpring(0, { stiffness: 250, damping: 22 })
  const rotateY = useSpring(0, { stiffness: 250, damping: 22 })
  const [hov, setHov] = useState(false)
  const isDesktop = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches

  const onMove = e => {
    if (!isDesktop) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    rotateX.set(((e.clientY - rect.top)  / rect.height - 0.5) * -8)
    rotateY.set(((e.clientX - rect.left) / rect.width  - 0.5) *  8)
  }
  const onLeave = () => { rotateX.set(0); rotateY.set(0); setHov(false) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.42, delay: 0.07 * index, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
      style={{
        rotateX, rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 700,
        padding: '1.15rem',
        background: hov ? `${color}09` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hov ? `${color}38` : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '16px',
        cursor: 'default',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
        boxShadow: hov ? `0 10px 28px ${color}15` : 'none',
        willChange: 'transform',
      }}
    >
      <motion.div
        animate={hov ? { rotate: [0, -8, 8, 0], y: -2 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          width: 44, height: 44, borderRadius: '12px',
          background: `${color}18`, border: `1px solid ${color}28`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '0.85rem',
          boxShadow: hov ? `0 4px 14px ${color}28` : 'none',
          transition: 'box-shadow 0.3s',
        }}
      >
        <Icon size={21} color={color} />
      </motion.div>
      <h3 style={{ fontWeight: 700, fontSize: '0.88rem', color: '#e2e8f0', marginBottom: '0.35rem', letterSpacing: '-0.01em' }}>{title}</h3>
      <p style={{ color: '#64748b', fontSize: '0.79rem', lineHeight: 1.75 }}>{desc}</p>
    </motion.div>
  )
}

/* Profile avatar — photo with initials fallback */
function ProfileAvatar() {
  const [imgError, setImgError] = useState(false)
  return (
    <div className="avatar-ring">
      <div className="avatar-inner">
        {!imgError ? (
          <img
            src={profileImg}
            alt="Sweta Ghosh"
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', borderRadius: '50%' }}
          />
        ) : (
          <span style={{
            fontSize: '1.85rem', fontWeight: 900,
            background: 'linear-gradient(135deg,#6366f1,#a78bfa)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>SG</span>
        )}
      </div>
    </div>
  )
}

export default function About() {
  const [expanded, setExpanded] = useState(false)

  return (
    <PageWrapper>
      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* ══ PROFILE CARD ══ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className={`profile-card ${expanded ? 'expanded' : ''}`}
            style={{ position: 'relative' }}
          >
            <div style={{
              background: 'rgba(13,18,32,0.85)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '22px',
              padding: '1.4rem',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 1,
            }}>
              {/* Top shimmer line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.35), rgba(167,139,250,0.28), transparent)',
                pointerEvents: 'none',
              }} />
              {/* Corner lighting */}
              <div style={{
                position: 'absolute', top: -30, left: -30,
                width: 160, height: 160, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', bottom: -20, right: -20,
                width: 120, height: 120, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              {/* ── Top row: avatar + name + chevron ── */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: expanded ? '1.25rem' : 0, position: 'relative', zIndex: 1 }}>

                <ProfileAvatar />

                {/* Name + role badge */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <motion.h1
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.025em', marginBottom: '0.45rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    Sweta Ghosh
                  </motion.h1>
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '0.26rem 0.8rem',
                      fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1',
                    }}
                  >
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: '#22c55e', boxShadow: '0 0 6px #22c55e',
                      animation: 'pulse-dot 2s ease-in-out infinite', flexShrink: 0,
                    }} />
                    Frontend Developer
                  </motion.span>
                </div>

                {/* Chevron toggle */}
                <motion.button
                  onClick={() => setExpanded(e => !e)}
                  animate={{ rotate: expanded ? 180 : 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  style={{
                    alignSelf: 'flex-start', flexShrink: 0,
                    width: 32, height: 32, borderRadius: '9px',
                    background: expanded ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.08)',
                    border: `1px solid ${expanded ? 'rgba(245,158,11,0.4)' : 'rgba(245,158,11,0.25)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#f59e0b',
                    transition: 'background 0.25s, border-color 0.25s',
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </motion.button>
              </div>

              {/* ── Collapsible details ── */}
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden', position: 'relative', zIndex: 1 }}
                  >
                    <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: '1.1rem' }} />

                    {/* Contact info rows */}
                    <motion.div
                      variants={staggerContainer}
                      initial="initial"
                      animate="animate"
                      style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.1rem' }}
                    >
                      {[
                        { ionIcon: 'mail-outline',      label: 'EMAIL',    value: 'swetaghosh665@gmail.com',              href: 'mailto:swetaghosh665@gmail.com' },
                        { ionIcon: 'location-outline',  label: 'LOCATION', value: 'Jharkhand, India',         href: null },
                        { ionIcon: 'briefcase-outline', label: 'STATUS',   value: 'Open to Work',                         href: null, highlight: true },
                      ].map(({ ionIcon, label, value, href, highlight }) => (
                        <motion.div key={label} variants={fadeSlide}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}
                        >
                          <div style={{
                            width: 38, height: 38, borderRadius: '10px', flexShrink: 0,
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            {/* Ionicons web component */}
                            <ion-icon
                              name={ionIcon}
                              style={{ fontSize: '16px', color: '#94a3b8' }}
                            />
                          </div>
                          <div>
                            <p style={{ fontSize: '0.62rem', color: '#475569', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.08rem' }}>{label}</p>
                            {href ? (
                              <a href={href} style={{ fontSize: '0.86rem', color: '#818cf8', fontWeight: 500, textDecoration: 'none' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
                                onMouseLeave={e => e.currentTarget.style.color = '#818cf8'}
                              >{value}</a>
                            ) : (
                              <p style={{
                                fontSize: '0.86rem',
                                color: highlight ? '#22c55e' : '#cbd5e1',
                                fontWeight: highlight ? 700 : 500,
                              }}>{value}</p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>

                    <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: '1rem' }} />

                    {/* Social links using Ionicons */}
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      {socials.map(({ ionIcon, href, color, label }, i) => (
                        <motion.a key={i} href={href} target="_blank" rel="noreferrer" title={label}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.07 * i, type: 'spring', stiffness: 300, damping: 16 }}
                          whileHover={{ scale: 1.15, y: -3 }}
                          whileTap={{ scale: 0.88 }}
                          style={{
                            width: 38, height: 38, borderRadius: '10px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#64748b', textDecoration: 'none',
                            transition: 'color 0.2s, border-color 0.2s, background 0.2s, box-shadow 0.2s',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.borderColor = `${color}50`
                            e.currentTarget.style.background = `${color}12`
                            e.currentTarget.style.boxShadow = `0 4px 14px ${color}28`
                            e.currentTarget.querySelector('ion-icon').style.color = color
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                            e.currentTarget.style.boxShadow = 'none'
                            e.currentTarget.querySelector('ion-icon').style.color = '#64748b'
                          }}
                        >
                          <ion-icon name={ionIcon} style={{ fontSize: '17px', color: '#64748b', transition: 'color 0.2s' }} />
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ══ ABOUT ME CARD ══ */}
        <Card delay={0.05} style={{ padding: '1.6rem' }}>
          <SectionHeading>About Me</SectionHeading>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: '0.91rem', marginBottom: '0.9rem' }}
          >
            Enthusiastic and detail-oriented Front-End Developer with a strong foundation in HTML5,
            CSS3, JavaScript, and Vue.js, along with knowledge of React.js. Experienced in building
            responsive and user-friendly web interfaces through projects and internship experience.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.18 }}
            style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: '0.91rem', marginBottom: '1rem' }}
          >
            Passionate about creating modern UI designs and enhancing user experience. A quick learner
            with strong problem-solving and teamwork skills, eager to contribute to innovative
            web development projects.
          </motion.p>

          {/* Interests row using Ionicons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.22, duration: 0.4 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
          >
            {[
              { icon: 'code-slash-outline',    label: 'Clean Code' },
              { icon: 'color-palette-outline', label: 'UI Design' },
              { icon: 'rocket-outline',        label: 'Performance' },
              { icon: 'accessibility-outline', label: 'Accessibility' },
              { icon: 'phone-portrait-outline', label: 'Mobile First' },
            ].map(({ icon, label }) => (
              <span key={label} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                background: 'rgba(99,102,241,0.08)',
                border: '1px solid rgba(99,102,241,0.18)',
                borderRadius: '999px',
                padding: '0.28rem 0.75rem',
                fontSize: '0.72rem', fontWeight: 600, color: '#818cf8',
                letterSpacing: '0.02em',
              }}>
                <ion-icon name={icon} style={{ fontSize: '12px' }} />
                {label}
              </span>
            ))}
          </motion.div>
        </Card>

        {/* ══ WHAT I'M DOING CARD ══ */}
        <Card delay={0.1} style={{ padding: '1.6rem' }}>
          <SectionHeading>What I'm Doing</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
            {services.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
          </div>
        </Card>

        {/* ══ TECHNOLOGIES CARD ══ */}
        <Card delay={0.15} style={{ padding: '1.6rem' }}>
          <SectionHeading>Technologies</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(86px, 1fr))', gap: '0.7rem' }}>
            {tech.map(({ icon, label, color }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, scale: 0.78, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.38, delay: 0.045 * i, type: 'spring', stiffness: 220, damping: 18 }}
              >
                <SkillCard icon={icon} label={label} color={color} />
              </motion.div>
            ))}
          </div>
        </Card>

      </div>
    </PageWrapper>
  )
}
