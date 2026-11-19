import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export type JobApplicationForm = {
  full_name: string;
  email: string;
  phone: string;
  target_position: string;
  qualifications: string;
  experience_years: string;
  cover_letter: string;
};

/** Submits the Careers page's "Medical Registration Form" to
 * careconnect-backend's public/site_api.py -- same unauthenticated,
 * rate-limited-per-IP-per-hospital shape as useContactInquiry.ts. */
export function useJobApplication(hospitalDisplayId: string) {
  const [submitting, setSubmitting] = useState(false);

  async function submit(form: JobApplicationForm): Promise<{ ok: true } | { ok: false; errors: string[] }> {
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/public/site/${hospitalDisplayId}/job-applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) return { ok: true };
      return { ok: false, errors: data.errors || [data.error || "Something went wrong."] };
    } catch {
      return { ok: false, errors: ["Couldn't reach the server — check your connection."] };
    } finally {
      setSubmitting(false);
    }
  }

  return { submit, submitting };
}
