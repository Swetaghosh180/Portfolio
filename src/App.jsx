import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import About from './pages/About'
import Resume from './pages/Resume'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'

/* Spring-based cursor glow — desktop/hover-capable only */
function CursorGlow() {
  const x = useSpring(-999, { stiffness: 80, damping: 22, mass: 0.5 })
  const y = useSpring(-999, { stiffness: 80, damping: 22, mass: 0.5 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    /* Only activate on devices that support hover (not touch-primary) */
    const mq = window.matchMedia('(hover: hover) and (min-width: 768px)')
    if (!mq.matches) return

    const move = e => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const hide = () => setVisible(false)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', hide)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', hide)
    }
  }, [x, y, visible])

  return (
    <motion.div
      className="cursor-glow"
      style={{ left: x, top: y, opacity: visible ? 1 : 0 }}
    />
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"          element={<About />} />
        <Route path="/about"     element={<About />} />
        <Route path="/resume"    element={<Resume />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact"   element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Ambient background blobs */}
      <div className="blob-field" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <CursorGlow />
      <Navbar />
      <main style={{ minHeight: '100vh' }}>
        <AnimatedRoutes />
      </main>
      <ScrollToTop />
    </BrowserRouter>
  )
}
