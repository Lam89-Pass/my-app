"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import HomeDashboard from "./sections/home-dashboard";
import KelolaProject from "./sections/kelola-project";
import KelolaBlog from "./sections/kelola-blog";
import KelolaExperience from "./sections/kelola-experience";
import KelolaSkills from "./sections/kelola-skills";
import KelolaContact from "./sections/kelola-contact";

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const currentMenu = searchParams.get("menu") || "home";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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

  return <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-10 animate-in fade-in duration-500">{renderContent()}</div>;
}
