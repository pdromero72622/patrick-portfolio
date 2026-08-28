export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f7f7f5]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="text-lg font-semibold tracking-tight">
          Patrick Romero
        </a>

        <nav className="hidden gap-8 text-sm text-black/60 md:flex">
          <a href="#about" className="transition hover:text-black">
            About
          </a>

          <a href="#projects" className="transition hover:text-black">
            Projects
          </a>

          <a href="#ai" className="transition hover:text-black">
            AI Workflow
          </a>

          <a href="#beyond" className="transition hover:text-black">
            Beyond the Build
          </a>
        </nav>
      </div>
    </header>
  );
}