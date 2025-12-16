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
  const [editing, setEditing] = useState(null);
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
      return (
        (a.assetId + a.model + a.serial).toLowerCase().includes(q) &&
        (status === "all" || a.status === status) &&
        (dept === "all" || a.department === dept)
      );
    });
  }, [assets, search, status, dept]);

  const remove = (id) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;
    setAssets((p) => p.filter((a) => a.id !== id));
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search asset..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select onValueChange={setStatus}>
          <SelectTrigger className="w-36">
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
          <SelectTrigger className="w-36">
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

        <Button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          Add Asset
        </Button>
      </div>

      <table className="w-full bg-white text-sm shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Asset ID</th>
            <th>Model</th>
            <th>Serial</th>
            <th>Status</th>
            <th>Department</th>
            <th></th>
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
              <td className="flex gap-2 p-1">
                <Button
                  size="sm"
                  onClick={() => {
                    setEditing(a);
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => remove(a.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AssetModal
        open={open}
        setOpen={setOpen}
        setAssets={setAssets}
        editing={editing}
      />
    </div>
  );
}
