import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export type PublicSiteDoctor = {
  id: string;
  name: string;
  specialization: string;
  qualification: string;
  years_experience: number | null;
};

export type PublicSiteDepartment = {
  id: string;
  name: string;
  description: string | null;
  floor_wing: string | null;
  consultation_hours: string | null;
};

export type PublicSiteService = {
  id: string;
  label: string;
};

export type TestimonialItem = { id: string; name: string; quote: string; rating: number };
export type RecoveryStoryItem = { id: string; title: string; description: string; image_url: string };
export type NewsItem = { id: string; title: string; summary: string; link: string; image_url: string };
export type CareerOpening = { id: string; title: string; description: string; link: string };

export type SectionKey =
  | "feature_cards" | "about" | "departments" | "services"
  | "testimonials" | "recovery_stories" | "news" | "careers" | "contact";

/** The hospital's theme config -- db/repositories/site_config.py's
 * default_site_config() is the backend's one source of truth for this
 * shape; this type must stay in sync with it by hand (two separate
 * codebases, no shared schema). */
export type SiteTheme = {
  brand: { logo_url: string; cover_image_url: string; tagline: string };
  sections: {
    feature_cards: { enabled: boolean };
    about: { enabled: boolean; text: string };
    departments: { enabled: boolean };
    services: { enabled: boolean };
    testimonials: { enabled: boolean; items: TestimonialItem[] };
    recovery_stories: { enabled: boolean; items: RecoveryStoryItem[] };
    news: { enabled: boolean; items: NewsItem[] };
    careers: { enabled: boolean; text: string; openings: CareerOpening[] };
    contact: { enabled: boolean };
  };
  section_order: SectionKey[];
};

export type PublicSiteData = {
  hospital: {
    name: string;
    contact_phone: string | null;
    contact_alternate_phone: string | null;
    contact_email: string | null;
    contact_address: string | null;
    business_hours_text: string | null;
    emergency_contact_number: string | null;
    emergency_contact_person: string | null;
    emergency_contact_designation: string | null;
  };
  departments: PublicSiteDepartment[];
  doctors_by_department: Record<string, PublicSiteDoctor[]>;
  services: PublicSiteService[];
  theme: SiteTheme;
  contact_inquiry_subjects: string[];
};

/** Loads careconnect-backend's public/site_api.py data for one hospital --
 * no auth header, same no-auth-fetch shape as the booking widget's own
 * usePublicBooking.ts in the other project (duplicated here rather than
 * shared across repos, since these are now two separate codebases).
 *
 * `previewToken` (from this page's own `?preview_token=` query param, set
 * by the portal editor's "Preview" link) switches to the .../preview
 * endpoint, which reads the DRAFT config instead of the published one --
 * this is the only thing that differs between a real patient's view and
 * an admin's preview. */
export function usePublicSite(hospitalDisplayId: string, previewToken?: string | null) {
  const [data, setData] = useState<PublicSiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setNotFound(false);
      try {
        const url = previewToken
          ? `${API_BASE_URL}/api/public/site/${hospitalDisplayId}/preview?token=${encodeURIComponent(previewToken)}`
          : `${API_BASE_URL}/api/public/site/${hospitalDisplayId}`;
        const res = await fetch(url);
        if (cancelled) return;
        if (!res.ok) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        const json = (await res.json()) as PublicSiteData;
        setData(json);
      } catch {
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [hospitalDisplayId, previewToken]);

  return { data, loading, notFound };
}
