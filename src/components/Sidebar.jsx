import { Button } from "@/components/ui/button";

export default function Sidebar({ setPage }) {
  return (
    <aside className="w-64 bg-white shadow p-4 space-y-2">
      <h2 className="text-xl font-bold mb-4">IT Asset System</h2>

      <Button className="w-full" onClick={() => setPage("dashboard")}>
        Dashboard
      </Button>
      <Button className="w-full" onClick={() => setPage("assets")}>
        Asset Master
      </Button>
      <Button className="w-full" onClick={() => setPage("logs")}>
        Audit Logs
      </Button>
    </aside>
  );
}
