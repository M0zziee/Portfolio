import { useState, useRef, useEffect } from "react"
import { TabBar } from "@/components/TabBar"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useTheme } from "@/hooks/useTheme"
import { tabs } from "@/data/portfolio"
import { HomeSection } from "@/sections/HomeSection"
import { AboutSection } from "@/sections/AboutSection"
import { ProjectsSection } from "@/sections/ProjectsSection"
import { SkillsSection } from "@/sections/SkillsSection"
import { ContactSection } from "@/sections/ContactSection"
import PixelSnow from "@/components/PixelSnow"
import { animate } from "animejs"

function App() {
  const [activeTab, setActiveTab] = useState("home")
  const { theme, toggleTheme } = useTheme()
  const contentRef = useRef(null)

  useEffect(() => {
    animate(contentRef.current, {
      opacity: [0, 1],
      translateY: [8, 0],
      easing: "easeOutQuad",
      duration: 400,
    })
  }, [activeTab])

  return (
    <div className="min-h-screen bg-background p-3 sm:p-6 space-y-4 relative">
      <PixelSnow
        color="#ffffff"
        density={0.2}
        speed={0.8}
        variant="round"
        pixelResolution={300}
        depthFade={5}
        brightness={0.6}
      />
      <div className="relative z-10 space-y-4">
        <TabBar tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div ref={contentRef} className="space-y-4">
          {activeTab === "home" && (
            <>
              <HomeSection />
              <AboutSection />
              <SkillsSection />
            </>
          )}
          {activeTab === "resume" && <ProjectsSection />}
          {activeTab === "contact" && <ContactSection />}
        </div>

        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
    </div>
  )
}

export default App
