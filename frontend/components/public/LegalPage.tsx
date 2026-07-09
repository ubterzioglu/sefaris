export type LegalSection = { heading: string; paragraphs: string[] };

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
          <p className="mt-4 text-sm text-slate-400">Son güncelleme: {updated}</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="leading-relaxed text-text-secondary">{intro}</p>
        <div className="mt-10 space-y-10">
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2 className="text-xl font-semibold text-primary">
                {i + 1}. {s.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="leading-relaxed text-text-secondary">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
