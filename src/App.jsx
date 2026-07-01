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
            { label: 'github.com/asdasdsdsdasdasdasd', href: 'https://github.com/asdasdsdsdasdasdasd' },
            { label: 'openclaw-agent', href: 'https://github.com/asdasdsdsdasdasdasd/openclaw-agent' },
          ]} /></PageTransition>
        } />
        <Route path="/sideproj" element={
          <PageTransition><ExternalPage src={main3} title="PROJECTS" subtitle="AI automation & research" links={[
            { label: 'OpenClaw job & scholarship agents', href: 'https://github.com/asdasdsdsdasdasdasd/openclaw-agent' },
            { label: 'Go AI — ResNet + MCTS', href: 'https://github.com/asdasdsdsdasdasdasd' },
          ]} /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return <AnimatedRoutes />
}
