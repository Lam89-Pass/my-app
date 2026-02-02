"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

// Import sections secara dinamis untuk performa lebih enteng
const HomeDashboard = dynamic(() => import("./sections/home-dashboard"), { ssr: false });
const KelolaProject = dynamic(() => import("./sections/kelola-project"), { ssr: false });
const KelolaBlog = dynamic(() => import("./sections/kelola-blog"), { ssr: false });
const KelolaExperience = dynamic(() => import("./sections/kelola-experience"), { ssr: false });
const KelolaSkills = dynamic(() => import("./sections/kelola-skills"), { ssr: false });
const KelolaContact = dynamic(() => import("./sections/kelola-contact"), { ssr: false });

// 1. Komponen Internal yang menggunakan searchParams
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

// 2. Export Utama yang MEMBUNGKUS Suspense
export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.5em] animate-pulse">Bantai_Loading_System...</p>
        </div>
      }
    >
      <AdminContent />
    </Suspense>
  );
}
