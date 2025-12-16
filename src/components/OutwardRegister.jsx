"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OutwardRegister() {
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({
    date: "",
    assetId: "",
    serial: "",
    destination: "",
    purpose: "",
    authorizedBy: "",
  });

  useEffect(() => {
    setLogs(JSON.parse(localStorage.getItem("outwardLogs") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("outwardLogs", JSON.stringify(logs));
  }, [logs]);

  const save = () => {
    setLogs((p) => [
      {
        id: crypto.randomUUID(),
        outwardId: `OUT-${Date.now()}`,
        ...form,
      },
      ...p,
    ]);
    setForm({
      date: "",
      assetId: "",
      serial: "",
      destination: "",
      purpose: "",
      authorizedBy: "",
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Outward Register</h2>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <Input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <Input
          placeholder="Asset ID"
          value={form.assetId}
          onChange={(e) => setForm({ ...form, assetId: e.target.value })}
        />
        <Input
          placeholder="Serial Number"
          value={form.serial}
          onChange={(e) => setForm({ ...form, serial: e.target.value })}
        />
        <Input
          placeholder="Issued To / Destination"
          value={form.destination}
          onChange={(e) => setForm({ ...form, destination: e.target.value })}
        />
        <Input
          placeholder="Purpose (Use / Repair / Disposal)"
          value={form.purpose}
          onChange={(e) => setForm({ ...form, purpose: e.target.value })}
        />
        <Input
          placeholder="Authorized By"
          value={form.authorizedBy}
          onChange={(e) => setForm({ ...form, authorizedBy: e.target.value })}
        />
      </div>

      <Button onClick={save}>Add Outward Entry</Button>

      <table className="w-full text-sm mt-4 bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th>Date</th>
            <th>Asset</th>
            <th>Serial</th>
            <th>Destination</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l.id} className="border-b">
              <td>{l.date}</td>
              <td>{l.assetId}</td>
              <td>{l.serial}</td>
              <td>{l.destination}</td>
              <td>{l.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
