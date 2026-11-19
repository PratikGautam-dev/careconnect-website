"use client";

import { SitePageShell, PageTitleBand } from "@/components/layout/SitePageShell";
import { CareersSection } from "@/components/sections/CareersSection";

export default function CareersPage() {
  return (
    <SitePageShell active="careers">
      {({ data, hospitalDisplayId }) => (
        <>
          <PageTitleBand
            title="Careers"
            subtitle="Join a team dedicated to compassionate, high-quality patient care."
          />
          <CareersSection
            text={data.theme.sections.careers.text}
            openings={data.theme.sections.careers.openings}
            hospitalDisplayId={hospitalDisplayId}
            hideHeading
          />
        </>
      )}
    </SitePageShell>
  );
}
