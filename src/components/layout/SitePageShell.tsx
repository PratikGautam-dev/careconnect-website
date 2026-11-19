"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { usePublicSite, type PublicSiteData } from "@/hooks/usePublicSite";
import { SiteHeader, type SitePage } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FloatingActionWidget, PreviewAndEmergencyBars } from "@/components/layout/SiteChrome";

const BOOKING_APP_URL = process.env.NEXT_PUBLIC_BOOKING_APP_URL || "http://localhost:3000";

/** Shared chrome (loading/not-found states, header, footer, preview/
 * emergency bars, floating widget) for every dedicated page (About/
 * Departments/Careers/Contact) -- each page passes its own `active` key
 * and a render-prop for its unique content, same split the homepage
 * itself now follows via the same header/footer components. */
export function SitePageShell({
  active,
  children,
}: {
  active: SitePage;
  children: (ctx: { data: PublicSiteData; bookingUrl: string; hospitalDisplayId: string }) => React.ReactNode;
}) {
  const params = useParams<{ hospitalDisplayId: string }>();
  const hospitalDisplayId = params.hospitalDisplayId;
  const previewToken = useSearchParams().get("preview_token");
  const previewQuery = previewToken ? `?preview_token=${encodeURIComponent(previewToken)}` : "";
  const { data, loading, notFound } = usePublicSite(hospitalDisplayId, previewToken);

  if (loading) {
    return (
      <div className="bg-paper flex min-h-screen items-center justify-center">
        <p className="text-hint text-[13px]">Loading…</p>
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div className="bg-paper flex min-h-screen items-center justify-center p-space-4">
        <Card className="p-space-6 max-w-md text-center">
          <p className="text-ink-900 text-[15px] font-semibold">This page isn&apos;t available</p>
          <p className="text-hint mt-space-2 text-[13px]">
            This link isn&apos;t active, or this hospital&apos;s website isn&apos;t turned on.
          </p>
        </Card>
      </div>
    );
  }

  const bookingUrl = `${BOOKING_APP_URL}/book/${hospitalDisplayId}`;

  return (
    <div className="bg-paper min-h-screen">
      <PreviewAndEmergencyBars previewing={Boolean(previewToken)} hospital={data.hospital} />
      <SiteHeader
        hospitalDisplayId={hospitalDisplayId}
        hospitalName={data.hospital.name}
        logoUrl={data.theme.brand.logo_url}
        bookingUrl={bookingUrl}
        active={active}
        previewQuery={previewQuery}
      />

      {children({ data, bookingUrl, hospitalDisplayId })}

      <SiteFooter
        hospitalDisplayId={hospitalDisplayId}
        hospital={data.hospital}
        departments={data.departments}
        previewQuery={previewQuery}
      />
      <FloatingActionWidget bookingUrl={bookingUrl} contactPhone={data.hospital.contact_phone} />
    </div>
  );
}

/** Small page-title band every dedicated page opens with -- consistent
 * "you've navigated to a real page, not just scrolled" cue the single
 * long homepage never needed. */
export function PageTitleBand({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="border-line bg-card border-b px-space-4 py-space-8 text-center">
      <h1 className="text-display-lg">{title}</h1>
      <p className="text-body mt-space-2 mx-auto max-w-xl">{subtitle}</p>
    </section>
  );
}
