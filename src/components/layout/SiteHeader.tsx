"use client";

import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export type SitePage = "home" | "about" | "departments" | "careers" | "contact";

const NAV_ITEMS: { key: SitePage; label: string; path: string }[] = [
  { key: "home", label: "Home", path: "" },
  { key: "about", label: "About", path: "about" },
  { key: "departments", label: "Departments", path: "departments" },
  { key: "careers", label: "Careers", path: "careers" },
  { key: "contact", label: "Contact Us", path: "contact" },
];

/** Shared across the homepage and every dedicated page (About/Departments/
 * Careers/Contact) -- real routed pages now, not just anchors on one long
 * homepage, mirroring the reference site's own top-nav structure. Carries
 * `previewQuery` through every link so a preview session (the portal
 * editor's "Preview" link, ?preview_token=...) stays active across page
 * navigation instead of silently dropping back to the published site. */
export function SiteHeader({
  hospitalDisplayId,
  hospitalName,
  logoUrl,
  bookingUrl,
  active,
  previewQuery,
}: {
  hospitalDisplayId: string;
  hospitalName: string;
  logoUrl: string;
  bookingUrl: string;
  active: SitePage;
  previewQuery: string;
}) {
  return (
    <header className="border-line bg-card/95 px-space-4 py-space-3 sticky top-0 z-40 flex items-center justify-between border-b backdrop-blur-sm">
      <a href={`/site/${hospitalDisplayId}${previewQuery}`} className="gap-space-2 flex items-center">
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- hospital-provided URL
          <img src={logoUrl} alt="" className="h-9 w-9 rounded-lg object-cover" />
        ) : (
          <div className="bg-brand-600 flex h-9 w-9 items-center justify-center rounded-lg text-[14px] font-extrabold text-white">
            {hospitalName.charAt(0)}
          </div>
        )}
        <span className="text-ink-900 text-[15px] font-bold">{hospitalName}</span>
      </a>
      <nav className="gap-space-6 hidden items-center md:flex">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.key}
            href={`/site/${hospitalDisplayId}${item.path ? `/${item.path}` : ""}${previewQuery}`}
            className={cn(
              "text-[13.5px] font-medium transition-colors duration-150",
              active === item.key ? "text-brand-700 font-semibold" : "text-ink-600 hover:text-ink-900",
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <Button href={bookingUrl} size="md">
        <CalendarCheck size={15} /> Book Appointment
      </Button>
    </header>
  );
}
