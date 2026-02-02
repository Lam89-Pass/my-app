"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import HomeDashboard from "./sections/home-dashboard";
import KelolaProject from "./sections/kelola-project";
import KelolaBlog from "./sections/kelola-blog";
import KelolaExperience from "./sections/kelola-experience";
import KelolaSkills from "./sections/kelola-skills";
import KelolaContact from "./sections/kelola-contact";

function AdminContent() {
  const searchParams = useSearchParams();
  const currentMenu = searchParams.get("menu") || "home";

  const renderContent = () => {
    switch (currentMenu) {
      case "home":
        return <HomeDashboard />;
      case "project":
        return <KelolaProject />;
      case "blog":
        return <KelolaBlog />;
      case "experience":
        return <KelolaExperience />;
      case "skills":
        return <KelolaSkills />;
      case "contact":
        return <KelolaContact />;
      default:
        return <HomeDashboard />;
    }
  };

  return <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-10">{renderContent()}</div>;
}

export default function AdminDashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <AdminContent />
    </Suspense>
  );
}
