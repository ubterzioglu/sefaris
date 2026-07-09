import {
  LayoutDashboard,
  ListTodo,
  FolderKanban,
  Users,
  Wallet,
  Search,
  FileText,
  UserCog,
  Settings,
  ListChecks,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Mobil alt navigasyonda gösterilen ana bağlantılar */
  primary?: boolean;
}

/** Admin panel navigasyonu (layout bölüm 13). */
export const NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Panel", icon: LayoutDashboard, primary: true },
  { href: "/admin/gorevler", label: "Görevler", icon: ListTodo, primary: true },
  { href: "/admin/projeler", label: "Projeler", icon: FolderKanban, primary: true },
  { href: "/admin/musteriler", label: "Müşteriler", icon: Users, primary: true },
  { href: "/admin/finans", label: "Finans", icon: Wallet, primary: true },
  { href: "/admin/seo", label: "SEO", icon: Search },
  { href: "/admin/dokumanlar", label: "Dokümanlar", icon: FileText },
  { href: "/admin/ekip", label: "Ekip", icon: UserCog },
  { href: "/admin/kalanlar", label: "Kalanlar", icon: ListChecks },
  { href: "/admin/ayarlar", label: "Ayarlar", icon: Settings },
];
