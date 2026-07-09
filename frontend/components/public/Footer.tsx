import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <span className="gradient-text text-xl font-bold">Sefaris</span>
          <p className="mt-3 text-sm text-text-secondary">{t("footer.offices")}</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-primary">{t("nav.services")}</h4>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li><Link href="/hizmetler/ozel-yazilim">{t("services.ozelYazilim")}</Link></li>
            <li><Link href="/hizmetler/proje-ortakligi">{t("services.projeOrtakligi")}</Link></li>
            <li><Link href="/hizmetler/seo-geo">{t("services.seoGeo")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-primary">Sefaris</h4>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li><Link href="/hakkimizda">{t("nav.about")}</Link></li>
            <li><Link href="/kariyer">{t("nav.careers")}</Link></li>
            <li><Link href="/blog">{t("nav.blog")}</Link></li>
            <li><Link href="/iletisim">{t("nav.contact")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-primary">Legal</h4>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li><Link href="/gizlilik-politikasi">KVKK / GDPR</Link></li>
            <li><Link href="/kullanim-kosullari">Kullanım Koşulları</Link></li>
            <li><Link href="/sss">SSS</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-text-muted">
        © 2026 Sefaris. {t("footer.rights")}
      </div>
    </footer>
  );
}
