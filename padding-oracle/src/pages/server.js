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
    <div className="min-h-screen bg-[#f7f5f2]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold text-[#111827]">
              Server Dashboard
            </h1>
            <p className="text-sm text-[#6b7280] mt-1">
              Monitor encrypted communication and responses
            </p>
          </div>

          {/* Mode Toggle */}
          <button
            onClick={toggleMode}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium border transition
              ${vulnerable
                ? "bg-[#fee2e2] text-[#991b1b] border-[#fecaca]"
                : "bg-[#ecfdf5] text-[#065f46] border-[#a7f3d0]"
              }
            `}
          >
            {vulnerable ? "Vulnerable Mode" : "Secure Mode"}
          </button>
        </div>

        {/* Messages Container */}
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {msgs.map((m) => (
            <div
              key={m.id}
              className="bg-white border border-[#e5e7eb] rounded-xl p-4 shadow-sm"
            >
              {/* Timestamp */}
              <div className="text-xs text-[#9ca3af]">
                {m.timestamp}
              </div>

              {/* Ciphertext */}
              <div className="mt-3">
                <div className="text-xs font-medium text-[#6b7280] mb-1">
                  Ciphertext
                </div>
                <div className="text-sm font-mono break-all text-[#374151] bg-[#f9fafb] p-2 rounded-md border">
                  {m.ciphertext}
                </div>
              </div>

              {/* Response */}
              <div className="mt-3">
                <div className="text-xs font-medium text-[#6b7280] mb-1">
                  Response Cipher
                </div>
                <div className="text-sm font-mono break-all text-[#374151] bg-[#f9fafb] p-2 rounded-md border">
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