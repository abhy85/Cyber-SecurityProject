import { useEffect, useState } from "react";

export default function Server() {
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMsgs(data);
    };

    fetchData();
    const i = setInterval(fetchData, 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Server Dashboard</h1>

      <div className="space-y-2">
        {msgs.map((m) => (
          <div key={m.id} className="bg-slate-800 p-3 rounded">
            <div>ID: {m.id}</div>
            <div className="break-all">{m.ciphertext}</div>
          </div>
        ))}
      </div>
    </div>
  );
}