import { useRef, useState, useEffect } from "react";
import { TerminalWindow } from "@/components/TerminalWindow";
import { TerminalOutput } from "@/components/TerminalOutput";
import { LogoLoop } from "@/components/LogoLoop";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useAnimateIn } from "@/hooks/useAnimateIn";
import { skills, skillDetail, portfolioTech } from "@/data/portfolio";
import { stagger, animate } from "animejs";
import { X } from "lucide-react";
import {
  SiReact,
  SiVite,
  SiJavascript,
  SiTailwindcss,
  SiShadcnui,
  SiRadixui,
  SiThreedotjs,
  SiGreensock,
  SiAnimedotjs,
  SiLucide,
  SiEslint,
} from "react-icons/si";

const iconMap = {
  SiReact,
  SiVite,
  SiJavascript,
  SiTailwindcss,
  SiShadcnui,
  SiRadixui,
  SiThreedotjs,
  SiGreensock,
  SiAnimedotjs,
  SiLucide,
  SiEslint,
};

const techLogos = portfolioTech.map((tech) => {
  const IconComp = iconMap[tech.icon];
  return {
    node: IconComp ? <IconComp /> : null,
    title: tech.name,
    href: tech.href,
    description: tech.description,
  };
});

function SkillsSection() {
  const sectionRef = useRef(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useAnimateIn(sectionRef, {
    selector: "[data-id='skills-cmd']",
    translateY: [15, 0],
    duration: 500,
    delay: 100,
  });

  useAnimateIn(sectionRef, {
    selector: "[data-id='skills-loop']",
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 700,
    delay: 300,
  });

  useAnimateIn(sectionRef, {
    selector: "[data-id='skills-category']",
    translateX: [-20, 0],
    opacity: [0, 1],
    duration: 600,
    delay: stagger(150, { from: "first", start: 500 }),
  });

  useAnimateIn(sectionRef, {
    selector: "[data-id='skills-category'] .skill-badge",
    scale: [0, 1],
    opacity: [0, 1],
    duration: 400,
    delay: stagger(50, { from: "first", start: 700 }),
  });

  useEffect(() => {
    if (!selectedSkill) return;
    animate("[data-id='skills-detail']", {
      translateX: [15, 0],
      opacity: [0, 1],
      duration: 350,
      easing: "easeOutQuad",
    });
  }, [selectedSkill]);

  const handleBadgeClick = (skill) => {
    setSelectedSkill((prev) => (prev === skill ? null : skill));
  };

  const selected = selectedSkill ? skillDetail[selectedSkill] : null;

  return (
    <div ref={sectionRef}>
      <TerminalWindow title="~/skills">
        <div data-id="skills-cmd">
          <TerminalOutput prompt="$" className="mb-4">
            cat skills.json
          </TerminalOutput>
          <TerminalOutput prompt="*" className="mb-4 text-2xl">
            Tech Used In This Projects
          </TerminalOutput>
        </div>

        <div data-id="skills-loop" className="mb-6 border-y border-border py-4">
          <TooltipProvider>
            <LogoLoop
              logos={techLogos}
              speed={60}
              direction="left"
              logoHeight={32}
              gap={48}
              hoverSpeed={0}
              fadeOut
              ariaLabel="Technologies used in this portfolio"
              renderItem={(item) => (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center cursor-pointer text-foreground/70 hover:text-foreground transition-colors duration-200">
                      {item.node}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    align="center"
                    className="flex gap-1.5"
                  >
                    <span className="font-semibold">{item.title}</span>
                    <span className="text-muted-foreground">
                      — {item.description}
                    </span>
                  </TooltipContent>
                </Tooltip>
              )}
            />
          </TooltipProvider>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4 lg:gap-6">
          <div className="min-w-0">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="mb-3 last:mb-0"
                data-id="skills-category"
              >
                <div className="flex gap-2 mb-1">
                  <span className="text-blue-500 shrink-0">[{category}]</span>
                  <span className="text-muted-foreground truncate">
                    // {items.join(", ")}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pl-0">
                  {items.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      data-skill={skill}
                      onClick={() => handleBadgeClick(skill)}
                      className={[
                        "skill-badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-none border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all font-sans",
                        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                        "hover:bg-muted hover:text-muted-foreground",
                        selectedSkill === skill
                          ? "border-primary text-primary bg-primary/10"
                          : "border-border text-foreground",
                      ].join(" ")}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div data-id="skills-detail" className="min-w-0">
            {selected ? (
              <div className="border border-border bg-muted/20 p-3 text-xs font-sans relative">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-border">
                  <span className="text-muted-foreground">
                    $ which {selectedSkill}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedSkill(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    aria-label="Close detail"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="font-semibold text-foreground mb-1">
                  {selectedSkill}
                </div>
                <div className="text-muted-foreground mb-2 leading-relaxed">
                  {selected.description}
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="text-blue-500">Category:</span>
                  <span>{selected.category}</span>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full items-center justify-center border border-dashed border-border/50 p-3 text-xs text-muted-foreground/50">
                Click a skill badge for details
              </div>
            )}
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}

export { SkillsSection };
