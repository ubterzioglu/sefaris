import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/** next-intl locale routing (/tr, /de, /en). JWT auth client tarafında yönetilir. */
export default createMiddleware(routing);

export const config = {
  // api, _next, statik dosyalar ve dosya uzantılı istekler hariç her şey
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
