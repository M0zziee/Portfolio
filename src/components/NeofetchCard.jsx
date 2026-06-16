import { cn } from "@/lib/utils";

const defaultAscii = [
  "   ▄▄▄▄███▄▄▄▄    ▄██████▄   ▄███████▄   ▄███████▄  ▄██   ▄         ▄█     ▄████████       ▄████████  ▄██████▄   ▄██████▄   ▄█        ",
  "  ▄██▀▀▀███▀▀▀██▄ ███    ███ ██▀     ▄██ ██▀     ▄██ ███   ██▄      ███    ███    ███      ███    ███ ███    ███ ███    ███ ███       ",
  "  ███   ███   ███ ███    ███       ▄███▀       ▄███▀ ███▄▄▄███      ███▌   ███    █▀       ███    █▀  ███    ███ ███    ███ ███       ",
  "  ███   ███   ███ ███    ███  ▀█▀▄███▀▄▄  ▀█▀▄███▀▄▄ ▀▀▀▀▀▀███      ███▌   ███             ███        ███    ███ ███    ███ ███       ",
  "  ███   ███   ███ ███    ███   ▄███▀   ▀   ▄███▀   ▀ ▄██   ███      ███▌ ▀███████████      ███        ███    ███ ███    ███ ███       ",
  "  ███   ███   ███ ███    ███ ▄███▀       ▄███▀       ███   ███      ███           ███      ███    █▄  ███    ███ ███    ███ ███       ",
  "  ███   ███   ███ ███    ███ ███▄     ▄█ ███▄     ▄█ ███   ███      ███     ▄█    ███      ███    ███ ███    ███ ███    ███ ███▌    ▄ ",
  "   ▀█   ███   █▀   ▀██████▀   ▀████████▀  ▀████████▀  ▀█████▀       █▀    ▄████████▀       ████████▀   ▀██████▀   ▀██████▀  █████▄▄██ ",
];

function NeofetchCard({ ascii = defaultAscii, info, className }) {
  const lines = Math.max(ascii.length, info.length);

  return (
    <div
      data-slot="neofetch-card"
      className={cn(
        "border border-border bg-muted/30 p-4 font-sans text-xs",
        className,
      )}
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <pre className="leading-relaxed text-primary/60 select-none shrink-0 hidden sm:block">
          {Array.from({ length: lines }, (_, i) => ascii[i] || "").join("\n")}
        </pre>
        <div className="leading-relaxed text-foreground space-y-0.5">
          {Array.from({ length: lines }, (_, i) => {
            const line = info[i] || "";
            if (!line) return <br key={i} />;
            const [label, ...rest] = line.split(":");
            return (
              <div key={i} className="flex gap-2">
                <span className="text-muted-foreground shrink-0">{label}:</span>
                <span className="text-foreground">{rest.join(":")}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { NeofetchCard };
