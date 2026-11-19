"use client";

import { SitePageShell, PageTitleBand } from "@/components/layout/SitePageShell";
import { AboutSection } from "@/components/sections/AboutSection";
import { FeatureCardsSection } from "@/components/sections/FeatureCardsSection";

export default function AboutPage() {
  return (
    <SitePageShell active="about">
      {({ data, bookingUrl, hospitalDisplayId }) => (
        <>
          <PageTitleBand
            title={`About ${data.hospital.name}`}
            subtitle="Our mission, our story, and the standard of care behind every visit."
          />
          <AboutSection hospitalName={data.hospital.name} text={data.theme.sections.about.text} hideHeading />
          <FeatureCardsSection
            bookingUrl={bookingUrl}
            careersHref={`/site/${hospitalDisplayId}/careers`}
            emergencyNumber={data.hospital.emergency_contact_number}
          />
        </>
      )}
    </SitePageShell>
  );
}
