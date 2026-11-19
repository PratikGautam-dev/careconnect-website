"use client";

import { useState } from "react";
import { AlertTriangle, Clock, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FormField, FormInput, FormSelect, FormTextarea } from "@/components/ui/FormField";
import { useContactInquiry, type ContactInquiryForm } from "@/hooks/useContactInquiry";
import type { PublicSiteData } from "@/hooks/usePublicSite";

const EMPTY_FORM: ContactInquiryForm = { full_name: "", email: "", phone: "", subject: "", message: "" };

export function ContactSection({
  hospital,
  hospitalDisplayId,
  inquirySubjects,
  hideHeading = false,
}: {
  hospital: PublicSiteData["hospital"];
  hospitalDisplayId: string;
  inquirySubjects: string[];
  hideHeading?: boolean;
}) {
  const hasContact =
    hospital.contact_address ||
    hospital.contact_phone ||
    hospital.contact_alternate_phone ||
    hospital.contact_email ||
    hospital.business_hours_text;
  if (!hasContact) return null;

  const { submit, submitting } = useContactInquiry(hospitalDisplayId);
  const [form, setForm] = useState<ContactInquiryForm>({ ...EMPTY_FORM, subject: inquirySubjects[0] || "" });
  const [errors, setErrors] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    const result = await submit(form);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setSent(true);
    setForm({ ...EMPTY_FORM, subject: inquirySubjects[0] || "" });
  }

  const mapsHref = hospital.contact_address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.contact_address)}`
    : null;

  return (
    <section id="contact" className="border-line bg-card border-t px-space-4 py-space-8">
      <div className="mx-auto max-w-5xl">
        {!hideHeading && <h2 className="text-display text-center">Contact Us</h2>}
        <div className={`gap-space-5 grid grid-cols-1 lg:grid-cols-2 ${hideHeading ? "" : "mt-space-6"}`}>
          {/* Left column: emergency callout, contact details, map */}
          <div className="gap-space-4 flex flex-col">
            {hospital.emergency_contact_number && (
              <Card className="bg-error-tint border-error/20 p-space-4">
                <div className="gap-space-2 text-error flex items-center">
                  <AlertTriangle size={17} className="shrink-0" />
                  <p className="text-[14px] font-bold">
                    {hospital.emergency_contact_designation || "Trauma & Emergency"}
                  </p>
                </div>
                <p className="text-ink-600 mt-space-2 text-[12.5px]">
                  For immediate ambulance dispatch or critical admission, call our emergency hotline
                  {hospital.emergency_contact_person ? ` (${hospital.emergency_contact_person})` : ""}:
                </p>
                <a
                  href={`tel:${hospital.emergency_contact_number}`}
                  className="text-error mt-space-2 inline-block text-[18px] font-bold underline underline-offset-2"
                >
                  {hospital.emergency_contact_number}
                </a>
              </Card>
            )}

            <div className="gap-space-4 flex flex-col">
              {hospital.contact_address && (
                <div className="gap-space-3 flex items-start">
                  <MapPin size={17} className="text-brand-600 mt-space-1 shrink-0" />
                  <div>
                    <p className="text-ink-900 text-[13.5px] font-semibold">Location Address</p>
                    <p className="text-hint text-[12.5px]">{hospital.contact_address}</p>
                  </div>
                </div>
              )}
              {hospital.contact_email && (
                <div className="gap-space-3 flex items-start">
                  <Mail size={17} className="text-brand-600 mt-space-1 shrink-0" />
                  <div>
                    <p className="text-ink-900 text-[13.5px] font-semibold">Email Inquiries</p>
                    <a href={`mailto:${hospital.contact_email}`} className="text-hint block text-[12.5px] hover:underline">
                      {hospital.contact_email}
                    </a>
                  </div>
                </div>
              )}
              {hospital.business_hours_text && (
                <div className="gap-space-3 flex items-start">
                  <Clock size={17} className="text-brand-600 mt-space-1 shrink-0" />
                  <div>
                    <p className="text-ink-900 text-[13.5px] font-semibold">Consultation Hours</p>
                    <p className="text-hint text-[12.5px]">{hospital.business_hours_text}</p>
                  </div>
                </div>
              )}
            </div>

            {mapsHref && (
              <div className="bg-brand-50 relative flex h-48 items-end justify-center overflow-hidden rounded-lg p-space-4">
                <Card className="p-space-3 w-full max-w-[240px] text-center">
                  <p className="text-ink-900 text-[13px] font-bold">{hospital.name}</p>
                  <p className="text-hint mt-space-1 text-[11.5px]">{hospital.contact_address}</p>
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-600 mt-space-2 inline-block text-[12px] font-semibold"
                  >
                    Open Google Maps Directions
                  </a>
                </Card>
              </div>
            )}
          </div>

          {/* Right column: inquiry form */}
          <Card className="p-space-5">
            <p className="text-ink-900 text-[15px] font-bold">Send Us an Inquiry</p>
            <p className="text-hint mt-space-1 mb-space-4 text-[12.5px]">
              Fill out the form below and our team will get back to you shortly.
            </p>

            {sent ? (
              <p className="text-success bg-success-tint rounded-md p-space-4 text-[13px] font-semibold">
                Thanks — your inquiry has been sent. We&apos;ll be in touch soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <FormField label="Your Full Name" required>
                  <FormInput
                    value={form.full_name}
                    onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
                    placeholder="e.g. Sunil Kumar"
                  />
                </FormField>
                <div className="gap-space-3 grid grid-cols-1 sm:grid-cols-2">
                  <FormField label="Email Address" required>
                    <FormInput
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="e.g. sunil@example.com"
                    />
                  </FormField>
                  <FormField label="Mobile Number" required>
                    <FormInput
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="e.g. 9876543210"
                    />
                  </FormField>
                </div>
                <FormField label="Inquiry Subject">
                  <FormSelect
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  >
                    {inquirySubjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </FormSelect>
                </FormField>
                <FormField label="Your Message" required>
                  <FormTextarea
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Type your query or assistance request here…"
                  />
                </FormField>

                {errors.length > 0 && (
                  <ul className="mb-space-3 text-error list-disc pl-space-4 text-[12.5px]">
                    {errors.map((e) => <li key={e}>{e}</li>)}
                  </ul>
                )}

                <Button type="submit" disabled={submitting} className="w-full">
                  <Send size={14} /> {submitting ? "Sending…" : "Submit Secure Inquiry"}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
