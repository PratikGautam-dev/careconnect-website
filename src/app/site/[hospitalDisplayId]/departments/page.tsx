"use client";

import { SitePageShell, PageTitleBand } from "@/components/layout/SitePageShell";
import { DepartmentsSection } from "@/components/sections/DepartmentsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";

export default function DepartmentsPage() {
  return (
    <SitePageShell active="departments">
      {({ data }) => (
        <>
          <PageTitleBand
            title="Departments & Specialities"
            subtitle="Meet our specialised departments and the doctors who lead them."
          />
          <DepartmentsSection departments={data.departments} doctorsByDepartment={data.doctors_by_department} />
          <ServicesSection services={data.services} />
        </>
      )}
    </SitePageShell>
  );
}
