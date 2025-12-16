"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AssetModal from "./AssetModal";

const STATUS = ["Active", "In Stock", "In Repair", "Disposed"];
const DEPT = ["IT", "HR", "Finance", "Sales"];

export default function AssetTable() {
  const [assets, setAssets] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [dept, setDept] = useState("all");

  useEffect(() => {
    setAssets(JSON.parse(localStorage.getItem("assets") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("assets", JSON.stringify(assets));
  }, [assets]);

  const filtered = useMemo(() => {
    return assets.filter((a) => {
      const q = search.toLowerCase();
      const matchQ =
        a.assetId.toLowerCase().includes(q) ||
        a.model.toLowerCase().includes(q) ||
        a.serial.toLowerCase().includes(q);

      const matchS = status === "all" || a.status === status;
      const matchD = dept === "all" || a.department === dept;

      return matchQ && matchS && matchD;
    });
  }, [assets, search, status, dept]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <Input
          placeholder="Search asset..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select onValueChange={setStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {STATUS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setDept}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {DEPT.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={() => setOpen(true)}>Add Asset</Button>
      </div>

      <table className="w-full bg-white shadow text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Asset ID</th>
            <th>Model</th>
            <th>Serial</th>
            <th>Status</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((a) => (
            <tr key={a.id} className="border-b">
              <td className="p-2">{a.assetId}</td>
              <td>{a.model}</td>
              <td>{a.serial}</td>
              <td>{a.status}</td>
              <td>{a.department}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AssetModal open={open} setOpen={setOpen} setAssets={setAssets} />
    </div>
  );
}
