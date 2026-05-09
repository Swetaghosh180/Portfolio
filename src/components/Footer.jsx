import { RiGithubLine, RiLinkedinBoxLine, RiInstagramLine, RiHeartFill } from 'react-icons/ri'

const socials = [
  { icon: RiGithubLine,      href: 'https://github.com/' },
  { icon: RiLinkedinBoxLine, href: 'https://linkedin.com/' },
  { icon: RiInstagramLine,   href: 'https://instagram.com/' },
]

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '2rem 1.5rem',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {socials.map(({ icon: Icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noreferrer"
              style={{
                width: 38, height: 38, borderRadius: '10px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#64748b', textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#6366f1'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)' }}
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
        <p style={{ fontSize: '0.8rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          © 2025 Sweta Ghosh · Made with <RiHeartFill size={13} color="#6366f1" /> in India
        </p>
      </div>
    </footer>
  )
}
