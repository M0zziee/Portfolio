import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

function TerminalShell({ quotes, className }) {
  const [history, setHistory] = useState([
    { type: "output", content: "Type 'help' to see available commands" },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIndex, setHistIndex] = useState(-1);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const handleDocumentClick = useCallback((e) => {
    if (terminalRef.current?.contains(e.target)) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);

  const addOutput = useCallback((content) => {
    setHistory((prev) => [...prev, { type: "output", content }]);
  }, []);

  const processCommand = useCallback(
    (raw) => {
      const cmd = raw.trim();
      if (!cmd) return;

      setHistory((prev) => [...prev, { type: "input", content: `$ ${cmd}` }]);
      setCmdHistory((prev) => [...prev, cmd]);
      setHistIndex(-1);

      const args = cmd.toLowerCase().split(/\s+/);
      const main = args[0];

      switch (main) {
        case "help": {
          addOutput(
            "Available commands:\n" +
              "  quotes                  - Display a random quote\n" +
              "  whoami                - Show user info\n" +
              "  date                       - Show current date/time\n" +
              "  social                     - Show social links\n" +
              "  clear                      - Clear terminal\n" +
              "  help                       - Show this message",
          );
          break;
        }
        case "fortune":
        case "quotes": {
          if (quotes.length === 0) {
            addOutput("No quotes loaded.");
            break;
          }
          const q = quotes[Math.floor(Math.random() * quotes.length)];
          addOutput(`"${q.text}"\n  — ${q.author}`);
          break;
        }
        case "whoami": {
          addOutput(
            "User   : Mozzy\n" +
              "Host   : portfolio\n" +
              "Role   : Full-Stack Developer\n" +
              "Loc    : Indonesia — Garut, Jawa-barat",
          );
          break;
        }
        case "date": {
          addOutput(new Date().toString());
          break;
        }
        case "social": {
          addOutput(
            "GitHub   -> https://github.com/mozzy\n" +
              "LinkedIn -> https://linkedin.com/in/mozzy\n" +
              "X        -> https://x.com/mozzy",
          );
          break;
        }
        case "clear": {
          setHistory([]);
          break;
        }
        default: {
          addOutput(`zsh: command not found: ${cmd}`);
          break;
        }
      }
    },
    [quotes, addOutput],
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIdx =
        histIndex === -1 ? cmdHistory.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(newIdx);
      setInput(cmdHistory[newIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex >= 0) {
        const newIdx = histIndex + 1;
        if (newIdx >= cmdHistory.length) {
          setHistIndex(-1);
          setInput("");
        } else {
          setHistIndex(newIdx);
          setInput(cmdHistory[newIdx]);
        }
      }
    }
  };

  return (
    <div ref={terminalRef} className={cn("border border-border bg-muted/20", className)}>
      <div
        ref={scrollRef}
        className="max-h-48 overflow-y-auto p-2 space-y-0.5 font-sans text-xs scroll-smooth"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, i) =>
          entry.type === "input" ? (
            <div key={i} className="text-foreground">
              <span className="text-muted-foreground select-none">
                {entry.content}
              </span>
            </div>
          ) : (
            <div
              key={i}
              className="text-foreground whitespace-pre-wrap leading-relaxed"
            >
              {entry.content}
            </div>
          ),
        )}
      </div>
      <div className="flex items-center border-t border-border px-2 py-1.5 bg-muted/10">
        <span className="text-muted-foreground select-none shrink-0 font-sans text-xs">
          $
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent border-none outline-none text-foreground font-sans text-xs ml-1.5"
        />
      </div>
    </div>
  );
}

export { TerminalShell };
