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
import { useState } from "react";

export default function AssetModal({ open, setOpen, setAssets }) {
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");
  const [status, setStatus] = useState("Active");
  const [department, setDepartment] = useState("IT");

  const save = () => {
    setAssets((p) => [
      ...p,
      {
        id: crypto.randomUUID(),
        assetId: `IT-AST-${String(p.length + 1).padStart(4, "0")}`,
        model,
        serial,
        status,
        department,
      },
    ]);
    setOpen(false);
    setModel("");
    setSerial("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Asset</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <Input
          placeholder="Serial"
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
        />

        <Select onValueChange={setStatus} defaultValue={status}>
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

        <Select onValueChange={setDepartment} defaultValue={department}>
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

        <Button onClick={save}>Save</Button>
      </DialogContent>
    </Dialog>
  );
}
