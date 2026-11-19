import { Heart } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { initialsAvatarUrl } from "@/lib/placeholderImages";
import type { PublicSiteDepartment, PublicSiteDoctor } from "@/hooks/usePublicSite";

export function DepartmentsSection({
  departments,
  doctorsByDepartment,
}: {
  departments: PublicSiteDepartment[];
  doctorsByDepartment: Record<string, PublicSiteDoctor[]>;
}) {
  if (departments.length === 0) return null;
  return (
    <section id="departments" className="px-space-4 py-space-8 mx-auto max-w-6xl">
      <h2 className="text-display text-center">Specialised Departments</h2>
      <p className="text-body mt-space-2 mx-auto max-w-xl text-center">
        Providing fully integrated medical care across major fields with dedicated specialists.
      </p>
      <div className="gap-space-4 mt-space-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {departments.map((dept) => (
          <Card key={dept.id} elevation="interactive" className="p-space-5">
            <div className="bg-brand-50 text-brand-700 flex h-11 w-11 items-center justify-center rounded-xl">
              <Heart size={20} />
            </div>
            <h3 className="text-ink-900 mt-space-3 text-[14.5px] font-semibold">{dept.name}</h3>
            {dept.description && <p className="text-hint mt-space-2 text-[12.5px]">{dept.description}</p>}
            {dept.floor_wing && <p className="text-hint mt-space-2 text-[11.5px]">📍 {dept.floor_wing}</p>}
            {dept.consultation_hours && (
              <p className="text-hint mt-space-1 text-[11.5px]">🕐 {dept.consultation_hours}</p>
            )}
            <a
              href={(doctorsByDepartment[dept.id]?.length ?? 0) > 0 ? `#dept-${dept.id}` : "#dept-doctors"}
              className="text-brand-600 hover:text-brand-700 mt-space-3 inline-block text-[12.5px] font-semibold"
            >
              View Landing Profile →
            </a>
          </Card>
        ))}
      </div>

      <div id="dept-doctors" className="mt-space-8 space-y-space-6">
        {departments
          .filter((dept) => (doctorsByDepartment[dept.id]?.length ?? 0) > 0)
          .map((dept) => (
            <div key={dept.id} id={`dept-${dept.id}`}>
              <h3 className="text-ink-900 mb-space-3 text-[15px] font-semibold">{dept.name}</h3>
              <div className="gap-space-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {doctorsByDepartment[dept.id].map((doc) => (
                  <Card key={doc.id} elevation="interactive" className="p-space-4">
                    <div className="gap-space-3 flex items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element -- generated avatar, not an uploaded photo */}
                      <img
                        src={initialsAvatarUrl(doc.name)}
                        alt=""
                        className="border-line h-12 w-12 shrink-0 rounded-full border"
                      />
                      <p className="text-ink-900 text-[14px] font-semibold">{doc.name}</p>
                    </div>
                    {doc.specialization && (
                      <p className="text-brand-700 mt-space-1 text-[12.5px] font-medium">{doc.specialization}</p>
                    )}
                    {doc.qualification && <p className="text-hint mt-space-1 text-[12px]">{doc.qualification}</p>}
                    {doc.years_experience != null && (
                      <p className="text-hint mt-space-1 text-[12px]">{doc.years_experience} years experience</p>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
