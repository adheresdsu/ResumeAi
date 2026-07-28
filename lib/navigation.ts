import type { LucideIcon } from "lucide-react";
import { Briefcase, FileText, Globe, LayoutDashboard, Mail, Settings } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const DASHBOARD_NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/resumes", label: "Resumes", icon: FileText },
  { href: "/dashboard/cover-letters", label: "Cover letters", icon: Mail },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: Globe },
  { href: "/dashboard/career-profile", label: "Career Profile", icon: Briefcase },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];
