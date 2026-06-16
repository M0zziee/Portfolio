import { TerminalWindow } from "@/components/TerminalWindow"
import { AsciiArt } from "@/components/AsciiArt"
import { NeofetchCard } from "@/components/NeofetchCard"
import { TerminalOutput } from "@/components/TerminalOutput"
import { TypewriterText } from "@/components/TypewriterText"
import { RotatingTypewriter } from "@/components/RotatingTypewriter"
import PixelTransition from "@/components/PixelTransition"
import { neofetchInfo } from "@/data/portfolio"

function HomeSection() {
  return (
  <div>
    <TerminalWindow title="~/home">
      <div className="space-y-6 flex-1">
        <AsciiArt>
          <div className="flex items-start gap-18">
            <div className="space-y-1">
              <TypewriterText
                text="Hello My name Is Fathir"
                speed={90}
                className="text-3xl text-foreground"
              />
              <div className="text-foreground max-w-lg space-y-1">
                <div>
                  <TypewriterText text="I Interested At " speed={15} cursor={false} className="text-2xl"/>
                  <RotatingTypewriter words={["Full-Stack", "Front-End", "Designer", "Game-Dev"]} className="text-2xl" />
                  <TypewriterText text=" who builds performant, pixel-perfect web experiences." speed={15} cursor={false} className="text-2xl"/>
                </div>
                <TypewriterText
                  text="I am a full-stack web developer specializing in delivering robust, end-to-end web solutions that bridge scalable backend functionality with intuitive user experiences. My technical expertise spans the entire development lifecycle, from designing efficient database schemas and writing high-performance server-side logic with Node.js, to crafting responsive, modern user interfaces using React and Tailwind CSS.

Driven by a commitment to engineering excellence, I place a strong emphasis on application performance, web accessibility, and clean architecture. By prioritizing sustainable coding practices and thoughtful system design from the start, I ensure that products remain highly maintainable and scalable, keeping technical debt to a minimum as the business and user base grow."
                  speed={6} className={""}
                />
              </div>
            </div>
            <div>
              <PixelTransition
                firstContent={
                  <div className="w-full h-full flex items-center justify-center bg-muted/30 text-muted-foreground text-xs">
                    [ GIF 1 ]
                  </div>
                }
                secondContent={
                  <div className="w-full h-full flex items-center justify-center bg-muted/30 text-muted-foreground text-xs">
                    [ GIF 2 ]
                  </div>
                }
                gridSize={8}
                pixelColor="currentColor"
                animationStepDuration={0.4}
                aspectRatio="56.25%"
                className="w-lg border border-border overflow-hidden"
              />
            </div>
          </div>
        </AsciiArt>
        <NeofetchCard info={neofetchInfo} />
        <div className="h-5 flex items-center">
          <TerminalOutput prompt="$">
            <TypewriterText text="neofetch --welcome" speed={200} />
          </TerminalOutput>
        </div>
      </div>
    </TerminalWindow>
    <TerminalWindow title="~/About">

    </TerminalWindow>
   </div>
  )
}

export { HomeSection }
