"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function InwardRegister() {
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({
    date: "",
    source: "",
    serial: "",
    quantity: 1,
    receivedBy: "",
    remarks: "",
  });

  useEffect(() => {
    setLogs(JSON.parse(localStorage.getItem("inwardLogs") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("inwardLogs", JSON.stringify(logs));
  }, [logs]);

  const save = () => {
    setLogs((p) => [
      {
        id: crypto.randomUUID(),
        inwardId: `IN-${Date.now()}`,
        ...form,
      },
      ...p,
    ]);
    setForm({
      date: "",
      source: "",
      serial: "",
      quantity: 1,
      receivedBy: "",
      remarks: "",
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Inward Register</h2>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <Input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <Input
          placeholder="Supplier / Source"
          value={form.source}
          onChange={(e) => setForm({ ...form, source: e.target.value })}
        />
        <Input
          placeholder="Asset Serial"
          value={form.serial}
          onChange={(e) => setForm({ ...form, serial: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Qty"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <Input
          placeholder="Received By"
          value={form.receivedBy}
          onChange={(e) => setForm({ ...form, receivedBy: e.target.value })}
        />
        <Input
          placeholder="Remarks"
          value={form.remarks}
          onChange={(e) => setForm({ ...form, remarks: e.target.value })}
        />
      </div>

      <Button onClick={save}>Add Inward Entry</Button>

      <table className="w-full text-sm mt-4 bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th>Date</th>
            <th>Source</th>
            <th>Serial</th>
            <th>Qty</th>
            <th>Received By</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l.id} className="border-b">
              <td>{l.date}</td>
              <td>{l.source}</td>
              <td>{l.serial}</td>
              <td>{l.quantity}</td>
              <td>{l.receivedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
