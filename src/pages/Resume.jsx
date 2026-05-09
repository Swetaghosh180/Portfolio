import { useState, useEffect, useRef } from 'react'
import { motion, useSpring, useInView } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { RiDownloadLine, RiGraduationCapLine, RiBriefcaseLine, RiAwardLine } from 'react-icons/ri'

const ease = [0.22, 1, 0.36, 1]

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease },
})

const skills = [
  { name: 'HTML & CSS',   pct: 95, color: '#6366f1' },
  { name: 'JavaScript',   pct: 88, color: '#a78bfa' },
  { name: 'Vue.js',       pct: 85, color: '#42b883' },
  { name: 'React.js',     pct: 72, color: '#61dafb' },
  { name: 'Tailwind CSS', pct: 90, color: '#06b6d4' },
  { name: 'Git & GitHub', pct: 82, color: '#f05032' },
  { name: 'Figma',        pct: 68, color: '#f24e1e' },
]

const education = [
  {
    title: 'Bachelor of Computer Applications (BCA)',
    sub: 'Netaji Subhas University, Jamshedpur',
    year: 'Aug 2023 – Aug 2026',
    desc: 'Pursuing BCA with focus on web technologies, programming fundamentals, and software development. Jharkhand, India.',
  },
  {
    title: 'Higher Secondary Education (12th)',
    sub: 'Seemanta Mahavidyalaya, Jharpokharia',
    year: '2023',
    desc: 'Completed Higher Secondary from Odisha board. Strong foundation in Science stream.',
  },
  {
    title: 'Secondary Education (10th)',
    sub: 'TPS DAV Public School, Baharagora',
    year: '2021',
    desc: 'Completed Secondary Education from Jharkhand. Developed early interest in computers and technology.',
  },
]

const experience = [
  {
    title: 'Frontend Developer Intern',
    sub: 'Roadlyft Rideshare Pvt. Ltd.',
    year: 'Nov 2025 – Jan 2026',
    desc: 'Developed responsive web interfaces using Vue.js, Tailwind CSS, HTML5, and JavaScript. Built reusable UI components, integrated RESTful APIs, applied UI/UX best practices, and collaborated with designers and backend developers to optimize performance.',
  },
]

const certs = [
  { name: 'Front-End Development with React.js and Angular', issuer: 'Simplilearn',   year: 'Jul 2025' },
  { name: 'Responsive Web Design Certification',             issuer: 'freeCodeCamp', year: 'Ongoing' },
  { name: 'Front-End Development Libraries Certification',   issuer: 'freeCodeCamp', year: 'Ongoing' },
  { name: 'Certified Full Stack Developer Curriculum',       issuer: 'freeCodeCamp', year: 'Ongoing' },
]

function SectionLabel({ children, color = '#6366f1' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '1.2rem' }}>
      <div style={{
        width: 3, height: 18, borderRadius: 2,
        background: `linear-gradient(to bottom, ${color}, ${color}60)`,
        boxShadow: `0 0 8px ${color}50`,
      }} />
      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
        {children}
      </span>
    </div>
  )
}

function TimelineItem({ item, icon: Icon, color, index }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div {...up(0.08 * index)} style={{ display: 'flex', gap: '0.9rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <motion.div
          whileHover={{ scale: 1.15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 18 }}
          style={{
            width: 38, height: 38, borderRadius: '50%',
            background: `${color}12`,
            border: `1.5px solid ${color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 16px ${color}25`,
          }}
        >
          <Icon size={16} color={color} />
        </motion.div>
        <div style={{
          width: 1, flex: 1,
          background: `linear-gradient(to bottom, ${color}35, transparent)`,
          marginTop: 4,
        }} />
      </div>

      <motion.div
        onHoverStart={() => setHov(true)}
        onHoverEnd={() => setHov(false)}
        animate={{ x: hov ? 4 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        style={{
          background: hov ? `${color}06` : 'rgba(255,255,255,0.03)',
          border: `1px solid ${hov ? `${color}28` : 'rgba(255,255,255,0.07)'}`,
          borderRadius: '14px',
          padding: '1rem 1.2rem',
          flex: 1,
          transition: 'background 0.3s, border-color 0.3s',
          boxShadow: hov ? `0 8px 28px ${color}12` : 'none',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.25rem' }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.9rem', color: '#e2e8f0', letterSpacing: '-0.015em' }}>{item.title}</h3>
          <span style={{
            fontSize: '0.67rem', color: color, fontWeight: 700,
            background: `${color}12`, padding: '0.15rem 0.65rem', borderRadius: 999,
            border: `1px solid ${color}25`,
          }}>
            {item.year}
          </span>
        </div>
        <p style={{ color: color, fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.35rem', opacity: 0.85 }}>{item.sub}</p>
        <p style={{ color: '#475569', fontSize: '0.8rem', lineHeight: 1.8 }}>{item.desc}</p>
      </motion.div>
    </motion.div>
  )
}

/* Animated skill bar with live counter */
function SkillBar({ name, pct, color, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const spring = useSpring(0, { stiffness: 50, damping: 18 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView) spring.set(pct)
  }, [inView, pct, spring])

  useEffect(() => {
    return spring.on('change', v => setDisplay(Math.round(v)))
  }, [spring])

  return (
    <motion.div ref={ref} {...up(0.04 * index)} style={{ marginBottom: index < skills.length - 1 ? '1.15rem' : 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
        <span style={{ fontSize: '0.83rem', fontWeight: 600, color: '#cbd5e1', letterSpacing: '-0.01em' }}>{name}</span>
        <span style={{ fontSize: '0.75rem', color, fontWeight: 700 }}>{display}%</span>
      </div>
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '999px', height: 5, overflow: 'hidden', position: 'relative',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.3, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '100%', borderRadius: '999px',
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
            boxShadow: `0 0 10px ${color}55`,
            position: 'relative',
          }}
        >
          {/* Tip glow */}
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0,
            width: 6, background: 'rgba(255,255,255,0.7)',
            borderRadius: '50%', filter: 'blur(2px)',
          }} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Resume() {
  return (
    <PageWrapper>
      <div className="page-content">

        {/* Header */}
        <motion.div {...up(0)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
          <div>
            <p className="section-label">My background</p>
            <h1 className="section-title">My <span className="gradient-text-2">Resume</span></h1>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              A snapshot of my education, experience & skills.
            </p>
          </div>
          <motion.a
            href="#" download
            className="btn-primary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <RiDownloadLine size={16} /> Download CV
          </motion.a>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem' }}>

          {/* Left column */}
          <div>
            <SectionLabel color="#6366f1">Education</SectionLabel>
            {education.map((item, i) => <TimelineItem key={i} item={item} index={i} icon={RiGraduationCapLine} color="#6366f1" />)}

            <div style={{ marginTop: '2.2rem' }}>
              <SectionLabel color="#22c55e">Experience</SectionLabel>
              {experience.map((item, i) => <TimelineItem key={i} item={item} index={i} icon={RiBriefcaseLine} color="#22c55e" />)}
            </div>
          </div>

          {/* Right column */}
          <div>
            <SectionLabel color="#a78bfa">Technical Skills</SectionLabel>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '18px',
              padding: '1.5rem',
              marginBottom: '2.2rem',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Top shimmer */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.3), transparent)',
                pointerEvents: 'none',
              }} />
              {skills.map(({ name, pct, color }, i) => (
                <SkillBar key={name} name={name} pct={pct} color={color} index={i} />
              ))}
            </div>

            <SectionLabel color="#f59e0b">Certifications</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {certs.map((c, i) => (
                <motion.div key={i} {...up(0.07 * i)}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '13px',
                    padding: '0.9rem 1.15rem',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem',
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                    position: 'relative', overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(245,158,11,0.28)'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(245,158,11,0.08)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '9px', flexShrink: 0,
                      background: 'rgba(245,158,11,0.1)',
                      border: '1px solid rgba(245,158,11,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <RiAwardLine size={15} color="#f59e0b" />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.85rem', color: '#e2e8f0', letterSpacing: '-0.01em' }}>{c.name}</p>
                      <p style={{ fontSize: '0.73rem', color: '#6366f1', fontWeight: 600, marginTop: '0.1rem' }}>{c.issuer}</p>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '0.7rem', color: '#f59e0b', fontWeight: 700,
                    background: 'rgba(245,158,11,0.1)', padding: '0.18rem 0.65rem', borderRadius: 999,
                    border: '1px solid rgba(245,158,11,0.22)',
                  }}>
                    {c.year}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageWrapper>
  )
}
