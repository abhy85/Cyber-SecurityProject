import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { runPaddingAttack } from "../../lib/attack";
import AttackBlockView from "../../components/AttackBlockView";
import AttackLogs from "../../components/AttackLogs";
import AttackControls from "../../components/AttackControls";

export default function AttackPage() {
  const router = useRouter();
  const { id } = router.query;

  const [target, setTarget] = useState(null);
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState("");
  const [speed, setSpeed] = useState(10);

  useEffect(() => {
    if (!id) return;

    fetch("/api/messages")
      .then((r) => r.json())
      .then((data) => {
        const msg = data.find(
          (m) => String(m.id) === id
        );
        setTarget(msg);
      });
  }, [id]);

  const oracle = async (cipher) => {
    const res = await fetch("/api/oracle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ciphertext: cipher }),
    });
    return res.json();
  };

  const start = async () => {
    setRunning(true);
    setLogs([]);

    const plain = await runPaddingAttack(
      target.ciphertext,
      oracle,
      (log) =>
        setLogs((l) => [...l.slice(-200), log]),
      speed
    );

    setResult(plain);
    setRunning(false);
  };

  if (!target) return null;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="p-6 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <AttackBlockView
            ciphertext={target.ciphertext}
            logs={logs}
          />

          <div className="mt-4 p-4 bg-slate-800 rounded-xl">
            <div className="text-sm text-slate-400">
              Recovered Plaintext
            </div>
            <div className="mt-2 text-green-400 break-all">
              {result}
            </div>
          </div>
        </div>

        <div>
          <AttackControls
            start={start}
            running={running}
            speed={speed}
            setSpeed={setSpeed}
          />

          <AttackLogs logs={logs} />
        </div>
      </div>
    </div>
  );
}