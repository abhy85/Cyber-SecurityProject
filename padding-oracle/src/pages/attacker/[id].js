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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!id) return;

    fetch("/api/messages")
      .then((r) => r.json())
      .then((data) => {
        const msg = data.find((m) => String(m.id) === id);
        setTarget(msg);
      });
  }, [id]);

  const oracle = async (cipher) => {
    const res = await fetch("/api/oracle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ciphertext: cipher }),
    });
    return res.json();
  };

  const start = async () => {
    setRunning(true);
    setLogs([]);
    setProgress(0);

    const plain = await runPaddingAttack(
      target.ciphertext,
      oracle,
      (log) => {
        setLogs((l) => [...l.slice(-200), log]);

        if (log.progress) setProgress(log.progress);
      },
      speed
    );

    setResult(plain);
    setRunning(false);
  };

  if (!target) return null;

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="col-span-2 space-y-4">
          
          {/* Block View */}
          <AttackBlockView ciphertext={target.ciphertext} logs={logs} />

          {/* Progress */}
          <div className="bg-white border rounded-xl p-4">
            <div className="text-sm text-[#6b7280] mb-2">
              Decryption Progress
            </div>

            <div className="w-full bg-[#e5e7eb] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#111827] h-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="text-xs text-[#9ca3af] mt-2">
              {Math.floor(progress)}% completed
            </div>
          </div>

          {/* Result */}
          <div className="bg-white border rounded-xl p-4">
            <div className="text-sm text-[#6b7280]">
              Recovered Plaintext
            </div>
            <div className="mt-2 text-sm font-mono text-[#111827] break-all">
              {result || "..."}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
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