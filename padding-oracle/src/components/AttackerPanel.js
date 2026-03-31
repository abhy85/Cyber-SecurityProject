// components/AttackerPanel.js
import { useEffect, useState } from "react";
import { oracle, sleep } from "../lib/attack";

export default function AttackerPanel() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [logs, setLogs] = useState([]);

  async function load() {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function startAttack() {
    if (!selected) return;

    setLogs([]);

    // simple demo: test oracle repeatedly
    for (let i = 0; i < 10; i++) {
      const valid = await oracle(selected.ciphertext);

      setLogs(prev => [
        ...prev,
        `Attempt ${i}: ${valid ? "VALID" : "INVALID"}`
      ]);

      await sleep(300);
    }
  }

  return (
    <div className="p-4 border rounded w-full">
      <h2 className="font-bold mb-2">Attacker</h2>

      <select
        className="border p-2 mb-2 w-full"
        onChange={e => {
          const msg = messages.find(m => m.id == e.target.value);
          setSelected(msg);
        }}
      >
        <option>Select message</option>
        {messages.map(m => (
          <option key={m.id} value={m.id}>
            {m.id}
          </option>
        ))}
      </select>

      <button
        onClick={startAttack}
        className="bg-red-500 text-white px-4 py-2"
      >
        Start Attack
      </button>

      <div className="mt-3 text-sm h-40 overflow-auto border p-2">
        {logs.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
}