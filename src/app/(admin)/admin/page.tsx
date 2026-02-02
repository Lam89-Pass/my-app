"use client";

import dynamicImport from "next/dynamic";
import { Suspense } from "react";

const AdminDashboard = dynamicImport(() => import("./AdminDashboard"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
});

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <AdminDashboard />
    </Suspense>
  );
}
