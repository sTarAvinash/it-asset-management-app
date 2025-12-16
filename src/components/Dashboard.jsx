"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    setAssets(JSON.parse(localStorage.getItem("assets") || "[]"));
  }, []);

  const warrantyStatus = (date) => {
    if (!date) return "N/A";
    const diff = (new Date(date) - new Date()) / (1000 * 60 * 60 * 24);
    if (diff < 0) return "Expired";
    if (diff < 30) return "Expiring Soon";
    return "Valid";
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 shadow">
          Total Assets
          <br />
          <b>{assets.length}</b>
        </div>
        <div className="bg-white p-4 shadow">
          Active
          <br />
          <b>{assets.filter((a) => a.status === "Active").length}</b>
        </div>
        <div className="bg-white p-4 shadow">
          In Repair
          <br />
          <b>{assets.filter((a) => a.status === "In Repair").length}</b>
        </div>
        <div className="bg-white p-4 shadow">
          Disposed
          <br />
          <b>{assets.filter((a) => a.status === "Disposed").length}</b>
        </div>
      </div>

      <h3 className="font-semibold mb-2">Warranty Alerts</h3>
      <table className="w-full bg-white text-sm">
        <thead className="bg-red-100">
          <tr>
            <th>Asset ID</th>
            <th>Model</th>
            <th>Warranty Status</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((a) => {
            const w = warrantyStatus(a.warranty);
            if (w === "Valid") return null;
            return (
              <tr key={a.id} className="border-b">
                <td>{a.assetId}</td>
                <td>{a.model}</td>
                <td
                  className={
                    w === "Expired" ? "text-red-600" : "text-orange-600"
                  }
                >
                  {w}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
