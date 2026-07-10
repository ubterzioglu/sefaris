import { notFound } from "next/navigation";

/**
 * Bilinmeyen route'ları yerelleştirilmiş 404'e yönlendirir (next-intl deseni).
 * Eşleşen özel route'lar bu catch-all'dan önce gelir; sadece hiçbir sayfaya
 * denk gelmeyen yollar buraya düşer ve [locale]/not-found.tsx render edilir.
 */
export default function CatchAllNotFound() {
  notFound();
}
