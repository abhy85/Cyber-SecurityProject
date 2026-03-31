// components/ServerPanel.js
import { useEffect, useState } from "react";

export default function ServerPanel() {
  const [messages, setMessages] = useState([]);

  async function load() {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-4 border rounded w-full">
      <h2 className="font-bold mb-2">Server (Encrypted Messages)</h2>

      <button onClick={load} className="mb-2 text-blue-500">
        Refresh
      </button>

      {messages.map(m => (
        <div key={m.id} className="text-xs break-all mb-2">
          {m.ciphertext}
        </div>
      ))}
    </div>
  );
}