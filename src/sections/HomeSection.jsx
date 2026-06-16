import { TerminalWindow } from "@/components/TerminalWindow";
import { AsciiArt } from "@/components/AsciiArt";
import { NeofetchCard } from "@/components/NeofetchCard";
import { TerminalOutput } from "@/components/TerminalOutput";
import { TypewriterText } from "@/components/TypewriterText";
import { RotatingTypewriter } from "@/components/RotatingTypewriter";
import PixelTransition from "@/components/PixelTransition";
import { neofetchInfo } from "@/data/portfolio";
import gif1 from "@/assets/Chisato1.gif"
import gif2 from "@/assets/Chisato2.gif"

function HomeSection() {
  return (
    <div>
      <TerminalWindow title="~/home">
        <div className="space-y-6 flex-1">
          <AsciiArt>
            <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-18">
              <div className="space-y-1 w-full md:w-auto">
                <TypewriterText
                  text="Hello My name Is Fathir"
                  speed={90}
                  className="text-2xl md:text-3xl text-foreground"
                />
                <div className="text-foreground w-full max-w-lg space-y-1">
                  <div>
                    <TypewriterText
                      text="I Interested At "
                      speed={15}
                      cursor={false}
                      className="text-xl md:text-2xl"
                    />
                    <RotatingTypewriter
                      words={[
                        "Full-Stack",
                        "Front-End",
                        "Designer",
                        "Game-Dev",
                      ]}
                      className="text-xl md:text-2xl"
                    />
                    <TypewriterText
                      text=" who builds performant, pixel-perfect web experiences."
                      speed={15}
                      cursor={false}
                      className="text-xl md:text-2xl"
                    />
                  </div>
                  <TypewriterText
                    text="I am a full-stack web developer specializing in delivering robust, end-to-end web solutions that bridge scalable backend functionality with intuitive user experiences. My technical expertise spans the entire development lifecycle, from designing efficient database schemas and writing high-performance server-side logic with Node.js, to crafting responsive, modern user interfaces using React and Tailwind CSS.

Driven by a commitment to engineering excellence, I place a strong emphasis on application performance, web accessibility, and clean architecture. By prioritizing sustainable coding practices and thoughtful system design from the start, I ensure that products remain highly maintainable and scalable, keeping technical debt to a minimum as the business and user base grow."
                    speed={6}
                    className={""}
                  />
                </div>
              </div>
              <div className="w-full md:w-auto">
                <PixelTransition
                  firstContent={
                    <img src={gif1} alt="" className="w-full h-full object-cover" />
                  }
                  secondContent={
                    <img src={gif2} alt="" className="w-full h-full object-cover" />
                  }
                  gridSize={8}
                  pixelColor="currentColor"
                  animationStepDuration={0.4}
                  aspectRatio="56.25%"
                  className="w-full md:w-lg border border-border overflow-hidden"
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
    </div>
  );
}

export { HomeSection };
