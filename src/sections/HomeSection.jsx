import { useState, useEffect, useRef } from "react";
import { TerminalWindow } from "@/components/TerminalWindow";
import { NeofetchCard } from "@/components/NeofetchCard";
import { TerminalOutput } from "@/components/TerminalOutput";
import { TypewriterText } from "@/components/TypewriterText";
import { RotatingTypewriter } from "@/components/RotatingTypewriter";
import PixelTransition from "@/components/PixelTransition";
import { useAnimateIn } from "@/hooks/useAnimateIn";
import { neofetchInfo, socialLinks, quotes } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { stagger } from "animejs";
import gif1 from "@/assets/Chisato1.gif";
import gif2 from "@/assets/Chisato2.gif";
import Avatar from "@/assets/Avatar.png";
function HomeSection() {
  const sectionRef = useRef(null);

  useAnimateIn(sectionRef, {
    selector:
      "[data-id='home-ascii'], [data-id='home-neofetch'], [data-id='home-cmd']",
    translateY: [25, 0],
    duration: 700,
    delay: stagger(200, { from: "first" }),
  });

  useAnimateIn(sectionRef, {
    selector: "[data-id='home-ascii'] > *",
    translateY: [20, 0],
    duration: 600,
    delay: stagger(80, { from: "first", start: 300 }),
  });

  const [quoteIndex, setQuoteIndex] = useState(() =>
    Math.floor(Math.random() * quotes.length),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * quotes.length);
        } while (next === prev);
        return next;
      });
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={sectionRef}>
      <TerminalWindow title="~/home">
        <div className="space-y-6 flex-1">
          <div data-id="home-ascii">
            <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-18">
              <div className="space-y-8 space-x-5 w-full md:w-auto">
                <TypewriterText
                  text="Hello! I’m Fathir Ramada & Welcome to my digital space."
                  speed={90}
                  className="text-5xl md:text-4xl sm:text-4xl text-foreground"
                />
                <div className="flex items-start gap-2 py-2 border-l-2 border-primary/40 pl-3">
                  <span className="text-muted-foreground font-mono text-xs select-none leading-5 shrink-0">
                    $
                  </span>
                  <div className="text-muted-foreground/80 italic text-sm leading-5">
                    <TypewriterText
                      key={quoteIndex}
                      text={quotes[quoteIndex].text}
                      speed={25}
                      cursor={false}
                    />
                  </div>
                </div>
                <div className="my-3 border-t border-border" />
                <div className="text-foreground w-full max-w-232 space-y-6">
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
                    text="I am a full-stack web developer specializing in delivering robust, end-to-end web solutions that bridge scalable backend functionality with intuitive user experiences."
                    speed={6}
                    className={"text-2xl"}
                  />
                  <div className="my-3 border-t border-border" />
                  <div className="flex flex-wrap items-center gap-3">
                    {socialLinks.map((link) => (
                      <Button
                        key={link.platform}
                        variant="outline"
                        size="icon"
                        asChild
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.platform === "github" && <FaGithub />}
                          {link.platform === "linkedin" && <FaLinkedin />}
                          {link.platform === "instagram" && <FaInstagram />}
                          {link.platform === "x" && <SiX />}
                        </a>
                      </Button>
                    ))}
                    <Button variant="default" asChild>
                      <a href="/resume.pdf" download>
                        <Download /> Resume
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-auto relative">
                <PixelTransition
                  firstContent={
                    <img
                      src={gif1}
                      alt="My bini 1"
                      className="w-full h-full object-cover"
                    />
                  }
                  secondContent={
                    <img
                      src={gif2}
                      alt="Sama aja my bini"
                      className="w-full h-full object-cover"
                    />
                  }
                  gridSize={8}
                  pixelColor="currentColor"
                  animationStepDuration={0.4}
                  aspectRatio="56.25%"
                  className="w-full md:w-lg border border-border overflow-hidden"
                />
                <img
                  className="absolute top-0 -translate-x-16 -translate-y-8 left-0 z-10 w-40 h-auto rotate-180"
                  src={Avatar}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div data-id="home-neofetch">
            <NeofetchCard info={neofetchInfo} />
          </div>
          <div className="h-5 flex items-center" data-id="home-cmd">
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
