"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function AssetModal({ open, setOpen, setAssets, editing }) {
  const isEdit = Boolean(editing);

  const [form, setForm] = useState({
    id: "",
    assetId: "",
    model: "",
    serial: "",
    status: "Active",
    department: "IT",
  });

  useEffect(() => {
    if (editing) {
      setForm(editing);
    } else {
      setForm({
        id: crypto.randomUUID(),
        assetId: "",
        model: "",
        serial: "",
        status: "Active",
        department: "IT",
      });
    }
  }, [editing, open]);

  const save = () => {
    setAssets((prev) => {
      if (isEdit) {
        return prev.map((a) => (a.id === form.id ? form : a));
      }
      return [
        ...prev,
        {
          ...form,
          assetId: `IT-AST-${String(prev.length + 1).padStart(4, "0")}`,
        },
      ];
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Asset" : "Add Asset"}</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Model"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
        />
        <Input
          placeholder="Serial Number"
          value={form.serial}
          onChange={(e) => setForm({ ...form, serial: e.target.value })}
        />

        <Select
          value={form.status}
          onValueChange={(v) => setForm({ ...form, status: v })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="In Stock">In Stock</SelectItem>
            <SelectItem value="In Repair">In Repair</SelectItem>
            <SelectItem value="Disposed">Disposed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={form.department}
          onValueChange={(v) => setForm({ ...form, department: v })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="IT">IT</SelectItem>
            <SelectItem value="HR">HR</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Sales">Sales</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={save}>{isEdit ? "Update Asset" : "Save Asset"}</Button>
      </DialogContent>
    </Dialog>
  );
}
