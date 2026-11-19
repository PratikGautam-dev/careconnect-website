import type { PublicSiteData, PublicSiteDepartment } from "@/hooks/usePublicSite";

export function SiteFooter({
  hospitalDisplayId,
  hospital,
  departments,
  previewQuery,
}: {
  hospitalDisplayId: string;
  hospital: PublicSiteData["hospital"];
  departments: PublicSiteDepartment[];
  previewQuery: string;
}) {
  return (
    <footer className="bg-ink-900 px-space-4 py-space-9 text-white/80">
      <div className="gap-space-8 mx-auto grid max-w-5xl grid-cols-2 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <p className="text-[14px] font-bold text-white">{hospital.name}</p>
          {hospital.contact_address && (
            <p className="mt-space-2 text-[12px] leading-relaxed text-white/60">{hospital.contact_address}</p>
          )}
        </div>
        <div>
          <p className="text-[11.5px] font-bold uppercase tracking-wide text-white/50">Quick Navigation</p>
          <ul className="mt-space-3 space-y-space-2 text-[12.5px]">
            <li><a href={`/site/${hospitalDisplayId}/about${previewQuery}`} className="hover:text-white">About</a></li>
            <li><a href={`/site/${hospitalDisplayId}/departments${previewQuery}`} className="hover:text-white">Departments</a></li>
            <li><a href={`/site/${hospitalDisplayId}/careers${previewQuery}`} className="hover:text-white">Careers</a></li>
            <li><a href={`/site/${hospitalDisplayId}/contact${previewQuery}`} className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <p className="text-[11.5px] font-bold uppercase tracking-wide text-white/50">Key Specialities</p>
          <ul className="mt-space-3 space-y-space-2 text-[12.5px]">
            {departments.slice(0, 6).map((d) => (
              <li key={d.id}>{d.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11.5px] font-bold uppercase tracking-wide text-white/50">Operating Hours</p>
          <p className="mt-space-3 text-[12.5px] leading-relaxed">
            {hospital.business_hours_text || "Add your operating hours in Settings."}
          </p>
          {hospital.contact_email && (
            <p className="mt-space-3 text-[12.5px] text-white/60">{hospital.contact_email}</p>
          )}
        </div>
      </div>
      <div className="mt-space-8 pt-space-4 mx-auto max-w-5xl border-t border-white/10 text-center text-[11.5px] text-white/50">
        <p>© {new Date().getFullYear()} {hospital.name}. Powered by CareConnect.</p>
      </div>
    </footer>
  );
}
