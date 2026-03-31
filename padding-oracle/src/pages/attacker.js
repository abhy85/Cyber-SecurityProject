import { useEffect, useState } from "react";
import { paddingOracleAttack } from "../lib/attack";
import BytePanel from "../components/BytePanel";

export default function Attacker() {
  const [msgs, setMsgs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then(setMsgs);
  }, []);

  const oracle = async (cipher) => {
    const res = await fetch("/api/oracle", {
      method: "POST",
      body: JSON.stringify({ ciphertext: cipher }),
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  };

  const startAttack = async () => {
    const recovered = await paddingOracleAttack(selected, oracle);
    setResult(recovered);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Attacker Panel</h1>

      <select
        onChange={(e) => setSelected(e.target.value)}
        className="bg-slate-800 p-2"
      >
        <option>Select Ciphertext</option>
        {msgs.map((m) => (
          <option key={m.id} value={m.ciphertext}>
            {m.id}
          </option>
        ))}
      </select>

      <button
        onClick={startAttack}
        className="ml-4 bg-indigo-500 px-4 py-2"
      >
        Start Attack
      </button>

      <BytePanel logs={logs} />

      <div className="mt-4">
        <strong>Recovered:</strong> {result}
      </div>
    </div>
  );
}