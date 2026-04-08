import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Asset Imports
import menuVideo from './assets/Mainn.mp4'
import main1 from './assets/main1.mp4'
import main2 from './assets/main2.mp4'
import main3 from './assets/main3.mp4'

// Component Imports
import P3Menu from './P3Menu'
import ResumePage from './ResumePage'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import SideProjects from './SideProjects' // Ensure you create this file
import './App.css'

function MenuScreen() {
  const navigate = useNavigate()
  
  // This helper maps the menu IDs to your actual routes
  const handleNavigate = (pageId) => {
    if (pageId === "github") {
      window.open("https://github.com/acidki", "_blank");
    } else {
      navigate(`/${pageId}`);
    }
  };

  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
      <P3Menu onNavigate={handleNavigate} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Main Menu */}
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />

        {/* About Section */}
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />

        {/* Resume Section - Uses main2.mp4 as background */}
        <Route path="/resume" element={
          <PageTransition variant="resume"><ResumePage src={main2} /></PageTransition>
        } />

        {/* Socials Section - Uses main3.mp4 logic inside component */}
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />

        {/* Side Projects Section */}
        <Route path="/projects" element={
          <PageTransition variant="projects"><SideProjects /></PageTransition>
        } />
        
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return <AnimatedRoutes />
}
