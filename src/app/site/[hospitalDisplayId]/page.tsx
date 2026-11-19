"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Building2, CalendarCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { usePublicSite, type SectionKey } from "@/hooks/usePublicSite";
import { AboutSection } from "@/components/sections/AboutSection";
import { CareersSection } from "@/components/sections/CareersSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { DepartmentsSection } from "@/components/sections/DepartmentsSection";
import { FeatureCardsSection } from "@/components/sections/FeatureCardsSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { RecoveryStoriesSection } from "@/components/sections/RecoveryStoriesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FloatingActionWidget, PreviewAndEmergencyBars } from "@/components/layout/SiteChrome";

const BOOKING_APP_URL = process.env.NEXT_PUBLIC_BOOKING_APP_URL || "http://localhost:3000";

/** Public hospital marketing homepage -- the other half of the Website
 * channel alongside the booking widget (a separate app, NEXT_PUBLIC_
 * BOOKING_APP_URL). Hero is fixed/first; everything below it is driven by
 * the hospital's own theme config (`data.theme`, db/repositories/
 * site_config.py) -- section_order decides WHAT shows and in WHICH order,
 * each section component renders null when disabled or empty. Header/
 * footer/chrome are shared with the dedicated About/Departments/Careers/
 * Contact pages (src/components/layout/) rather than copy-pasted. */
export default function PublicSitePage() {
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

  const { hospital, departments, doctors_by_department, services, theme } = data;
  const bookingUrl = `${BOOKING_APP_URL}/book/${hospitalDisplayId}`;
  const totalDoctors = Object.values(doctors_by_department).reduce((n, docs) => n + docs.length, 0);

  const sectionRenderers: Record<SectionKey, () => React.ReactNode> = {
    feature_cards: () => (
      <FeatureCardsSection
        bookingUrl={bookingUrl}
        careersHref={`/site/${hospitalDisplayId}/careers${previewQuery}`}
        emergencyNumber={hospital.emergency_contact_number}
      />
    ),
    about: () => <AboutSection hospitalName={hospital.name} text={theme.sections.about.text} />,
    departments: () => <DepartmentsSection departments={departments} doctorsByDepartment={doctors_by_department} />,
    services: () => <ServicesSection services={services} />,
    testimonials: () => <TestimonialsSection items={theme.sections.testimonials.items} />,
    recovery_stories: () => <RecoveryStoriesSection items={theme.sections.recovery_stories.items} />,
    news: () => <NewsSection items={theme.sections.news.items} />,
    careers: () => (
      <CareersSection
        text={theme.sections.careers.text}
        openings={theme.sections.careers.openings}
        hospitalDisplayId={hospitalDisplayId}
      />
    ),
    contact: () => (
      <ContactSection
        hospital={hospital}
        hospitalDisplayId={hospitalDisplayId}
        inquirySubjects={data.contact_inquiry_subjects}
      />
    ),
  };

  return (
    <div className="bg-paper min-h-screen">
      <PreviewAndEmergencyBars previewing={Boolean(previewToken)} hospital={hospital} />

      <SiteHeader
        hospitalDisplayId={hospitalDisplayId}
        hospitalName={hospital.name}
        logoUrl={theme.brand.logo_url}
        bookingUrl={bookingUrl}
        active="home"
        previewQuery={previewQuery}
      />

      {/* Hero -- always first, fixed */}
      <section className="from-brand-50 relative overflow-hidden bg-gradient-to-b to-transparent px-space-4 py-space-10">
        <div className="gap-space-10 mx-auto grid max-w-6xl grid-cols-1 items-center lg:grid-cols-2">
          <div>
            <span className="text-eyebrow border-clay-300 bg-card px-space-3 py-space-2 inline-block rounded-full border shadow-[var(--shadow-sm)]">
              {theme.brand.tagline || "Multi-Specialty Healthcare"}
            </span>
            <h1 className="text-display-lg mt-space-4">{hospital.name}</h1>
            <p className="text-body mt-space-3 max-w-lg">
              Book your appointment online, through WhatsApp, or walk in — whichever works for you.
            </p>
            <div className="gap-space-3 mt-space-6 flex flex-wrap items-center">
              <Button href={bookingUrl} size="lg">
                <CalendarCheck size={17} /> Book Appointment
              </Button>
              <Button href={`/site/${hospitalDisplayId}/careers${previewQuery}`} variant="secondary" size="lg">
                Careers
              </Button>
            </div>
            <div className="gap-space-3 mt-space-8 flex flex-wrap items-center">
              <StatPill icon={Building2} label="Departments" value={String(departments.length)} />
              <StatPill icon={Users} label="Doctors" value={String(totalDoctors)} />
              <StatPill icon={CalendarCheck} label="Booking Channels" value="WhatsApp, Web, Walk-in" />
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- hospital-provided URL or a static fallback asset */}
          <img
            src={theme.brand.cover_image_url || "/hospital-hero.png"}
            alt="Hospital building exterior"
            className="border-line aspect-[9/7] w-full rounded-xl border object-cover shadow-[var(--shadow-lg)]"
          />
        </div>
      </section>

      {/* Everything below the hero, admin-ordered */}
      {theme.section_order
        .filter((key) => theme.sections[key].enabled)
        .map((key) => <div key={key}>{sectionRenderers[key]()}</div>)}

      <SiteFooter
        hospitalDisplayId={hospitalDisplayId}
        hospital={hospital}
        departments={departments}
        previewQuery={previewQuery}
      />
      <FloatingActionWidget bookingUrl={bookingUrl} contactPhone={hospital.contact_phone} />
    </div>
  );
}

function StatPill({ icon: Icon, label, value }: { icon: typeof Building2; label: string; value: string }) {
  return (
    <div className="border-line bg-card gap-space-2 px-space-4 py-space-2 flex items-center rounded-full border shadow-[var(--shadow-sm)]">
      <Icon size={15} className="text-brand-600" />
      <span className="text-ink-900 text-[13.5px] font-semibold">{value}</span>
      <span className="text-hint text-[12.5px]">{label}</span>
    </div>
  );
}
