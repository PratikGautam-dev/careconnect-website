import { Briefcase, CalendarCheck, Siren } from "lucide-react";
import { Card } from "@/components/ui/Card";

type Tone = "brand" | "success" | "error";

const TONE_CLASSES: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700",
  success: "bg-success-tint text-success",
  error: "bg-error-tint text-error",
};

function FeatureCard({
  icon: Icon,
  tone,
  title,
  description,
  actionLabel,
  href,
}: {
  icon: typeof CalendarCheck;
  tone: Tone;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
}) {
  return (
    <Card elevation="interactive" className="p-space-5">
      <div className={`${TONE_CLASSES[tone]} flex h-11 w-11 items-center justify-center rounded-xl`}>
        <Icon size={20} />
      </div>
      <p className="text-ink-900 mt-space-3 text-[14.5px] font-semibold">{title}</p>
      <p className="text-hint mt-space-1 text-[12.5px]">{description}</p>
      <a
        href={href}
        className="text-brand-600 hover:text-brand-700 mt-space-3 inline-block text-[12.5px] font-semibold"
      >
        {actionLabel} →
      </a>
    </Card>
  );
}

export function FeatureCardsSection({
  bookingUrl,
  careersHref = "#careers",
  emergencyNumber,
}: {
  bookingUrl: string;
  careersHref?: string;
  emergencyNumber: string | null;
}) {
  return (
    <section className="px-space-4 pb-space-8 mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
      <FeatureCard
        icon={CalendarCheck}
        tone="brand"
        title="Book OPD Slot"
        description="Reserve a doctor consultation online in a few steps."
        actionLabel="Book Doctor Now"
        href={bookingUrl}
      />
      <FeatureCard
        icon={Briefcase}
        tone="success"
        title="Clinical Careers"
        description="Explore clinical and administrative openings at this hospital."
        actionLabel="View Openings"
        href={careersHref}
      />
      <FeatureCard
        icon={Siren}
        tone="error"
        title="Emergency Care"
        description="Round-the-clock emergency support for urgent cases."
        actionLabel={emergencyNumber ? "Call Emergency Desk" : "Contact Us"}
        href={emergencyNumber ? `tel:${emergencyNumber}` : "#contact"}
      />
    </section>
  );
}
