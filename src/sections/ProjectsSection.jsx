import { useRef } from "react"
import { TerminalWindow } from "@/components/TerminalWindow"
import { TerminalOutput } from "@/components/TerminalOutput"
import Masonry from "@/components/Masonry"
import ProjectCard from "@/components/ProjectCard"
import AcademicCard from "@/components/AcademicCard"
import CertCard from "@/components/CertCard"
import { useAnimateIn } from "@/hooks/useAnimateIn"
import { projects, academic, certifications } from "@/data/portfolio"
import caffeinanceImg from "@/assets/Caffeinance.png"

const projectImages = {
  "Caffeinance.png": caffeinanceImg,
}

const masonryItems = projects.map((p) => ({
  id: p.id,
  url: p.github,
  height: p.height,
  name: p.name,
  description: p.description,
  tech: p.tech,
  status: p.status,
  github: p.github,
  demo: p.demo,
  img: p.image ? projectImages[p.image] : null,
}))

function ProjectsSection() {
  const sectionRef = useRef(null)

  useAnimateIn(sectionRef, {
    selector: "[data-id='resume-cmd']",
    translateY: [15, 0],
    duration: 500,
    delay: 100,
  })

  useAnimateIn(sectionRef, {
    selector: "[data-id='resume-academic']",
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 600,
    delay: 200,
  })

  useAnimateIn(sectionRef, {
    selector: "[data-id='resume-projects']",
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 600,
    delay: 400,
  })

  useAnimateIn(sectionRef, {
    selector: "[data-id='resume-certifications']",
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 600,
    delay: 600,
  })

  return (
    <div ref={sectionRef} className="space-y-1.5">
      <TerminalWindow
        title="~/academic"
        statusBar="NORMAL  resume  UTF-8"
      >
        <div data-id="resume-cmd">
          <TerminalOutput prompt="$" className="mb-4">
            cat education.md
          </TerminalOutput>
        </div>
        <div data-id="resume-academic" className="space-y-3">
          {academic.map((item, idx) => (
            <AcademicCard key={idx} item={item} index={idx} />
          ))}
        </div>
      </TerminalWindow>

      <TerminalWindow title="~/projects">
        <div data-id="resume-projects">
          <div className="min-h-[300px]">
            <Masonry
              items={masonryItems}
              renderItem={(item) => <ProjectCard item={item} />}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={false}
              blurToFocus={false}
            />
          </div>
        </div>
      </TerminalWindow>

      <TerminalWindow title="~/certifications">
        <div data-id="resume-cmd">
          <TerminalOutput prompt="$" className="mb-4">
            cat certifications.json
          </TerminalOutput>
        </div>
        <div data-id="resume-certifications" className="space-y-3">
          {certifications.map((item, idx) => (
            <CertCard key={idx} item={item} index={idx} />
          ))}
        </div>
      </TerminalWindow>
    </div>
  )
}

export { ProjectsSection }
