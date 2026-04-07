export default function Footer() {
  return (
    <footer className="border-t border-galaxy-border/40 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-linear-to-br from-galaxy-purple to-galaxy-cyan flex items-center justify-center">
            <span className="text-white text-xs font-bold font-mono">G</span>
          </div>
          <span className="font-display font-bold text-white">
            Galaxy<span className="text-gradient">AI</span>
          </span>
        </div>
        <p className="text-galaxy-muted text-xs font-mono text-center">
           Galaxy AI Interview Simulator. Built with React + TypeScript.
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-galaxy-muted text-xs hover:text-galaxy-subtext transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}