"use client";

import { SitePageShell, PageTitleBand } from "@/components/layout/SitePageShell";
import { ContactSection } from "@/components/sections/ContactSection";

export default function ContactPage() {
  return (
    <SitePageShell active="contact">
      {({ data, hospitalDisplayId }) => (
        <>
          <PageTitleBand
            title="Contact & Help Desk"
            subtitle="Get in touch for appointments, general billing inquiries, lab test pricing, or ambulance support."
          />
          <ContactSection
            hospital={data.hospital}
            hospitalDisplayId={hospitalDisplayId}
            inquirySubjects={data.contact_inquiry_subjects}
            hideHeading
          />
        </>
      )}
    </SitePageShell>
  );
}
