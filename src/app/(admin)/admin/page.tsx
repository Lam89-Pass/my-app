"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import HomeDashboard from "./sections/home-dashboard";
import KelolaProject from "./sections/kelola-project";
import KelolaBlog from "./sections/kelola-blog";
import KelolaExperience from "./sections/kelola-experience";
import KelolaSkills from "./sections/kelola-skills";
import KelolaContact from "./sections/kelola-contact";

// 1. PINDAHKAN LOGIKA KE KOMPONEN TERPISAH
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

// 2. BUNGKUS DENGAN SUSPENSE DI EXPORT UTAMA
export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">Bantai_Loading_Admin...</p>
          </div>
        </div>
      }
    >
      <AdminContent />
    </Suspense>
  );
}
