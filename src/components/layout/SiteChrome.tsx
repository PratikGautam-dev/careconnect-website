"use client";

import { useState } from "react";
import { CalendarCheck, MessageCircle, Phone, Siren, X } from "lucide-react";
import type { PublicSiteData } from "@/hooks/usePublicSite";

/** The preview banner + emergency bar (top) and floating action widget
 * (bottom) -- identical on every page, so extracted once rather than
 * copy-pasted into the homepage and every new dedicated page. */
export function PreviewAndEmergencyBars({
  previewing,
  hospital,
}: {
  previewing: boolean;
  hospital: PublicSiteData["hospital"];
}) {
  const [dismissed, setDismissed] = useState(false);
  const hasEmergencyContact = Boolean(hospital.emergency_contact_number);
  return (
    <>
      {previewing && (
        <div className="bg-clay-500 flex items-center justify-center gap-2 px-4 py-2 text-[12.5px] font-semibold text-white">
          Previewing unpublished changes — this is not what patients currently see.
        </div>
      )}
      {hasEmergencyContact && !dismissed && (
        <div className="bg-error gap-space-3 px-space-4 py-space-2 flex items-center justify-center text-[12.5px] font-semibold text-white">
          <Siren size={14} className="shrink-0" />
          <span className="truncate">
            EMERGENCY HELPLINE (24/7)
            {hospital.emergency_contact_person ? ` — ${hospital.emergency_contact_person}` : ""}: Critical
            care services available.
          </span>
          <a
            href={`tel:${hospital.emergency_contact_number}`}
            className="gap-space-1 px-space-3 flex h-7 shrink-0 items-center rounded-full bg-white/15 text-[12px] font-bold whitespace-nowrap hover:bg-white/25"
          >
            <Phone size={12} /> {hospital.emergency_contact_number}
          </a>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss emergency banner"
            className="shrink-0 text-white/80 hover:text-white"
          >
            <X size={15} />
          </button>
        </div>
      )}
    </>
  );
}

export function FloatingActionWidget({
  bookingUrl,
  contactPhone,
}: {
  bookingUrl: string;
  contactPhone: string | null;
}) {
  return (
    <div className="bottom-space-4 right-space-4 gap-space-2 fixed z-50 flex flex-col items-end">
      <a
        href={bookingUrl}
        className="bg-brand-600 hover:bg-brand-700 gap-space-2 px-space-4 flex h-11 items-center rounded-full text-[13px] font-semibold text-white shadow-[var(--shadow-lg)] transition-transform duration-150 hover:-translate-y-0.5"
      >
        <CalendarCheck size={15} /> Book Appointment
      </a>
      {contactPhone && (
        <a
          href={`tel:${contactPhone}`}
          className="bg-card border-line gap-space-2 px-space-4 flex h-11 items-center rounded-full border text-[13px] font-semibold text-ink-900 shadow-[var(--shadow-lg)] transition-transform duration-150 hover:-translate-y-0.5"
        >
          <MessageCircle size={15} className="text-brand-600" /> Chat / Call Us
        </a>
      )}
    </div>
  );
}
