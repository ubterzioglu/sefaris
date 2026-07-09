import { DETR_BRAND_GRADIENT, DETR_ORANGE } from "@/app/admin/_components/theme";
import { DETR_UPDATES } from "@/app/admin/_components/updates";

const UPDATE_DATE_FORMAT = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC"
});

function formatUpdateDate(date: string): string {
  try {
    return UPDATE_DATE_FORMAT.format(new Date(`${date}T00:00:00Z`));
  } catch {
    return date;
  }
}

/**
 * Hard-coded "Güncellemeler" section — a collapsible glass card matching the
 * admin board style, listing changelog entries newest-first from updates.ts.
 */
export function DetrUpdatesSection() {
  const updates = DETR_UPDATES;

  return (
    <details
      open
      className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 sm:px-8 [&::-webkit-details-marker]:hidden">
        <h2 className="flex items-center gap-2 text-base font-semibold text-white">
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-black"
            style={{ backgroundImage: DETR_BRAND_GRADIENT }}
          >
            ✦
          </span>
          Güncellemeler
          <span className="ml-1 text-[12px] font-medium text-white/40">
            ({updates.length})
          </span>
        </h2>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/40 transition-transform duration-200 group-open:rotate-180"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>

      <div className="space-y-2.5 px-6 pb-6 pt-1 sm:px-8">
        {updates.length === 0 ? (
          <p className="rounded-[1rem] border border-dashed border-white/15 px-5 py-6 text-center text-[13px] text-white/50">
            Henüz güncelleme yok.
          </p>
        ) : (
          updates.map((update, index) => (
            <article
              key={`${update.date}-${index}`}
              className="relative rounded-[0.95rem] border border-white/[0.08] bg-white/[0.02] px-4 py-3 pl-5"
            >
              {/* Accent rail */}
              <span
                aria-hidden
                className="absolute inset-y-3 left-0 w-[3px] rounded-full"
                style={{ backgroundImage: DETR_BRAND_GRADIENT }}
              />
              <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-[14px] font-semibold text-white">
                  {update.title}
                </h3>
                {update.tag ? (
                  <span
                    className="inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em]"
                    style={{
                      borderColor: "rgba(251,146,60,0.35)",
                      background: "rgba(251,146,60,0.10)",
                      color: DETR_ORANGE
                    }}
                  >
                    {update.tag}
                  </span>
                ) : null}
                <span className="ml-auto shrink-0 text-[11px] font-medium text-white/40">
                  {formatUpdateDate(update.date)}
                </span>
              </div>
              <p className="whitespace-pre-wrap break-words text-[13px] leading-6 text-white/70">
                {update.body}
              </p>
            </article>
          ))
        )}
      </div>
    </details>
  );
}
