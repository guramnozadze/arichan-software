export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 mix-blend-difference">
      <nav className="flex items-center justify-between px-5 py-5 sm:px-8 font-mono text-[0.6875rem] tracking-[0.22em] uppercase text-cream">
        <a href="#top" className="hover:text-orchid transition-colors">
          Arichan Software
        </a>
        <a href="#contact" className="hover:text-orchid transition-colors">
          Contact ↘
        </a>
      </nav>
    </header>
  );
}
