const SOCIALS = [
  { label: "X", href: "https://x.com/sefaris" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/sefaris" },
  { label: "GitHub", href: "https://github.com/ubterzioglu/sefaris" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 flex flex-col items-center gap-4">
      <nav aria-label="Social links" className="flex items-center gap-6">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-[0.2em] text-white/50 transition hover:text-white"
          >
            {s.label}
          </a>
        ))}
      </nav>
      <p className="text-[11px] text-white/30">
        © {new Date().getFullYear()} Sefaris · sefaris.site
      </p>
    </footer>
  );
}
