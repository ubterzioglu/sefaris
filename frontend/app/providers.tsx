"use client";

import { Provider } from "react-redux";
import { store } from "@/store";

/** Redux + RTK Query sağlayıcısı (rehber bölüm 2.5.7). */
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
