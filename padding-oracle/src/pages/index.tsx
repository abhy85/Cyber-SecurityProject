// pages/index.js
import ClientPanel from "../components/ClientPanel";
import ServerPanel from "../components/ServerPanel";
import AttackerPanel from "../components/AttackerPanel";

export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      <ClientPanel />
      <ServerPanel />
      <AttackerPanel />
    </div>
  );
}