"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AssetTable from "@/components/AssetTable";

export default function Home() {
  const [page, setPage] = useState("assets");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar setPage={setPage} />

      <main className="flex-1 p-6">
        {page === "assets" && <AssetTable />}
        {page === "dashboard" && (
          <h1 className="text-2xl font-bold">Dashboard</h1>
        )}
        {page === "logs" && <h1 className="text-2xl font-bold">Audit Logs</h1>}
      </main>
    </div>
  );
}
