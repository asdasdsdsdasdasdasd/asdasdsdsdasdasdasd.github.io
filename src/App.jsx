import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import menuVideo from './assets/main1.mp4'
import main1 from './assets/main1.mp4'
import main2 from './assets/main1.mp4'
import main3 from './assets/main1.mp4'
import P3Menu from './P3Menu'
import VideoPage from './VideoPage'
import ResumePage from './ResumePage'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import ExternalPage from './ExternalPage'
import BackgroundMusic from './BackgroundMusic'
import './App.css'

function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition><ResumePage src={main2} /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
        <Route path="/github" element={
          <PageTransition><ExternalPage src={main1} title="GITHUB" subtitle="Open source & code" links={[
            { label: 'Profile — github.com/asdasdsdsdasdasdasd', href: 'https://github.com/asdasdsdsdasdasdasd' },
            { label: 'racecar — DreamerV3 world-model RL', href: 'https://github.com/asdasdsdsdasdasdasd/racecar' },
            { label: 'mnist-dann — domain adaptation', href: 'https://github.com/asdasdsdsdasdasdasd/mnist-dann' },
            { label: 'openclaw-agent — LLM browser agents', href: 'https://github.com/asdasdsdsdasdasdasd/openclaw-agent' },
            { label: 'automated-food-ordering — Vue + LLM chat', href: 'https://github.com/asdasdsdsdasdasdasd/automated-food-ordering-website-SDSC4116' },
          ]} /></PageTransition>
        } />
        <Route path="/sideproj" element={
          <PageTransition><ExternalPage src={main3} title="PROJECTS" subtitle="RL · agents · domain adaptation · LLM apps" links={[
            { label: 'World Model RL Race Track (DreamerV3 + racecar_gym)', href: 'https://github.com/asdasdsdsdasdasdasd/racecar' },
            { label: 'MNIST Domain Adaptation — DANN & CDAN-E', href: 'https://github.com/asdasdsdsdasdasdasd/mnist-dann' },
            { label: 'OpenClaw — JobsDB & scholarship mail agents', href: 'https://github.com/asdasdsdsdasdasdasd/openclaw-agent' },
            { label: 'AI Food Ordering Website — Vue.js + Claude / DeepSeek', href: 'https://github.com/asdasdsdsdasdasdasd/automated-food-ordering-website-SDSC4116' },
            { label: 'Personal site (this portfolio)', href: 'https://github.com/asdasdsdsdasdasdasd/asdasdsdsdasdasdasd.github.io' },
          ]} /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <>
      <BackgroundMusic />
      <AnimatedRoutes />
    </>
  )
}
