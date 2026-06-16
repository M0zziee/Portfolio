import { useState } from "react"
import { TabBar } from "@/components/TabBar"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useTheme } from "@/hooks/useTheme"
import { tabs } from "@/data/portfolio"
import { HomeSection } from "@/sections/HomeSection"
import { AboutSection } from "@/sections/AboutSection"
import { ProjectsSection } from "@/sections/ProjectsSection"
import { SkillsSection } from "@/sections/SkillsSection"
import { ContactSection } from "@/sections/ContactSection"

function App() {
  const [activeTab, setActiveTab] = useState("home")
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background p-6 space-y-4">
      <TabBar tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "home" && <HomeSection />}
      {activeTab === "about" && <AboutSection />}
      {activeTab === "projects" && <ProjectsSection />}
      {activeTab === "skills" && <SkillsSection />}
      {activeTab === "contact" && <ContactSection />}

      <ThemeToggle theme={theme} onToggle={toggleTheme} />
    </div>
  )
}

export default App
