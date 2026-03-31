import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Server() {
  const [msgs, setMsgs] = useState([]);
  const [vulnerable, setVulnerable] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMsgs(data);
    };

    fetchData();
    const i = setInterval(fetchData, 1000);

    return () => clearInterval(i);
  }, []);

  const toggleMode = async () => {
    const res = await fetch("/api/toggle-mode", {
      method: "POST",
    });
    const data = await res.json();
    setVulnerable(data.vulnerable);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="p-6">
        <div className="flex justify-between mb-6">
          <h1 className="text-xl font-semibold">
            Server Dashboard
          </h1>

          <button
            onClick={toggleMode}
            className={`px-4 py-2 rounded-full ${
              vulnerable
                ? "bg-red-500"
                : "bg-green-500"
            }`}
          >
            {vulnerable
              ? "Vulnerable Mode"
              : "Secure Mode"}
          </button>
        </div>

        <div className="space-y-3 max-h-[70vh] overflow-y-auto">
          {msgs.map((m) => (
            <div
              key={m.id}
              className="bg-slate-800 p-4 rounded-xl"
            >
              <div className="text-xs text-slate-400">
                {m.timestamp}
              </div>

              <div className="mt-2 text-sm">
                <div>
                  <strong>Ciphertext:</strong>
                </div>
                <div className="break-all text-indigo-300">
                  {m.ciphertext}
                </div>
              </div>

              <div className="mt-2 text-sm">
                <div>
                  <strong>Response:</strong>
                </div>
                <div className="break-all text-green-300">
                  {m.responseCipher}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}