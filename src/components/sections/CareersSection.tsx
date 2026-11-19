"use client";

import { useState } from "react";
import { Briefcase, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FormField, FormInput, FormSelect, FormTextarea } from "@/components/ui/FormField";
import { useJobApplication, type JobApplicationForm } from "@/hooks/useJobApplication";
import type { CareerOpening } from "@/hooks/usePublicSite";

function emptyForm(defaultPosition: string): JobApplicationForm {
  return {
    full_name: "", email: "", phone: "", target_position: defaultPosition,
    qualifications: "", experience_years: "", cover_letter: "",
  };
}

export function CareersSection({
  text,
  openings,
  hospitalDisplayId,
  hideHeading = false,
}: {
  text: string;
  openings: CareerOpening[];
  hospitalDisplayId: string;
  hideHeading?: boolean;
}) {
  const { submit, submitting } = useJobApplication(hospitalDisplayId);
  const [form, setForm] = useState<JobApplicationForm>(emptyForm(openings[0]?.title || ""));
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
    setForm(emptyForm(openings[0]?.title || ""));
  }

  if (openings.length === 0) {
    return (
      <section id="careers" className="px-space-4 py-space-8 mx-auto max-w-2xl text-center">
        {!hideHeading && <h2 className="text-display">Careers</h2>}
        {text && <p className={hideHeading ? "text-body" : "text-hint mt-space-3 text-[13px]"}>{text}</p>}
        {!text && (
          <p className="text-hint mt-space-3 text-[13px]">
            No openings have been listed yet — contact the hospital directly to inquire.
          </p>
        )}
      </section>
    );
  }

  return (
    <section id="careers" className="px-space-4 py-space-8 mx-auto max-w-5xl">
      {!hideHeading && <h2 className="text-display text-center">Careers</h2>}
      <div className={`gap-space-5 grid grid-cols-1 lg:grid-cols-2 ${hideHeading ? "" : "mt-space-6"}`}>
        {/* Left column: openings list */}
        <div>
          <p className="text-ink-900 text-[17px] font-bold">Current Clinical Openings</p>
          {text && <p className="text-hint mt-space-1 text-[12.5px]">{text}</p>}
          <div className="mt-space-4 gap-space-3 flex flex-col">
            {openings.map((opening) => (
              <Card key={opening.id} elevation="interactive" className="p-space-4">
                <div className="gap-space-2 flex items-start justify-between">
                  <div className="gap-space-2 flex items-center">
                    <Briefcase size={16} className="text-brand-600 shrink-0" />
                    <p className="text-ink-900 text-[14px] font-semibold">{opening.title}</p>
                  </div>
                </div>
                {opening.description && (
                  <p className="text-hint mt-space-2 text-[12.5px]">{opening.description}</p>
                )}
                {opening.link ? (
                  <a
                    href={opening.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-600 mt-space-2 inline-block text-[12px] font-semibold"
                  >
                    Apply Now for this Position →
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, target_position: opening.title }))}
                    className="text-brand-600 hover:text-brand-700 mt-space-2 inline-block text-[12px] font-semibold"
                  >
                    Apply Now for this Position →
                  </button>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Right column: application form */}
        <Card className="p-space-5 h-fit">
          <p className="text-ink-900 text-[15px] font-bold">Medical Registration Form</p>
          <p className="text-hint mt-space-1 mb-space-4 text-[12.5px]">
            Register your details. Applications are sent directly to the hospital for review.
          </p>

          {sent ? (
            <p className="text-success bg-success-tint rounded-md p-space-4 text-[13px] font-semibold">
              Thanks — your application has been submitted. The hospital will reach out if there&apos;s a fit.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <FormField label="Full Name" required>
                <FormInput
                  value={form.full_name}
                  onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
                  placeholder="e.g. Dr. Rajesh Sharma"
                />
              </FormField>
              <div className="gap-space-3 grid grid-cols-1 sm:grid-cols-2">
                <FormField label="Email Address" required>
                  <FormInput
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="e.g. rajesh@example.com"
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
              <FormField label="Target Position" required>
                <FormSelect
                  value={form.target_position}
                  onChange={(e) => setForm((f) => ({ ...f, target_position: e.target.value }))}
                >
                  {openings.map((o) => (
                    <option key={o.id} value={o.title}>{o.title}</option>
                  ))}
                </FormSelect>
              </FormField>
              <FormField label="Degrees & Specialization" required>
                <FormInput
                  value={form.qualifications}
                  onChange={(e) => setForm((f) => ({ ...f, qualifications: e.target.value }))}
                  placeholder="e.g. MBBS, MD, DM (Cardiology)"
                />
              </FormField>
              <FormField label="Total Experience" required>
                <FormInput
                  value={form.experience_years}
                  onChange={(e) => setForm((f) => ({ ...f, experience_years: e.target.value }))}
                  placeholder="e.g. 8 years of clinical practice"
                />
              </FormField>
              <FormField label="Statement of Purpose / Cover Letter">
                <FormTextarea
                  value={form.cover_letter}
                  onChange={(e) => setForm((f) => ({ ...f, cover_letter: e.target.value }))}
                  placeholder="Briefly state your clinical focus or experience…"
                />
              </FormField>

              {errors.length > 0 && (
                <ul className="mb-space-3 text-error list-disc pl-space-4 text-[12.5px]">
                  {errors.map((e) => <li key={e}>{e}</li>)}
                </ul>
              )}

              <Button type="submit" disabled={submitting} className="w-full">
                <Send size={14} /> {submitting ? "Submitting…" : "Submit Application"}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </section>
  );
}
