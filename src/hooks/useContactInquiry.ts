import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export type ContactInquiryForm = {
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

/** Submits the Contact page's "Send Us an Inquiry" form to
 * careconnect-backend's public/site_api.py (unauthenticated, rate-limited
 * per-IP-per-hospital same as the booking widget's own submit). */
export function useContactInquiry(hospitalDisplayId: string) {
  const [submitting, setSubmitting] = useState(false);

  async function submit(form: ContactInquiryForm): Promise<{ ok: true } | { ok: false; errors: string[] }> {
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/public/site/${hospitalDisplayId}/contact-inquiries`, {
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
