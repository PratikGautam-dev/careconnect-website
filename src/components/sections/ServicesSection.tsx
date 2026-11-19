import type { PublicSiteService } from "@/hooks/usePublicSite";

export function ServicesSection({ services }: { services: PublicSiteService[] }) {
  if (services.length === 0) return null;
  return (
    <section className="px-space-4 py-space-8 mx-auto max-w-5xl">
      <h2 className="text-display text-center">Services We Offer</h2>
      <div className="gap-space-3 mt-space-6 flex flex-wrap items-center justify-center">
        {services.map((service) => (
          <span
            key={service.id}
            className="border-line bg-card text-ink-900 px-space-4 py-space-2 rounded-full border text-[13px] font-medium"
          >
            {service.label}
          </span>
        ))}
      </div>
    </section>
  );
}
