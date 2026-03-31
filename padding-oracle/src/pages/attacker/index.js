import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { runPaddingAttack } from "../../lib/attack";
import AttackBlockView from "../../components/AttackBlockView";
import AttackControls from "../../components/AttackControls";
import ValidBytes from "../../components/ValidBytes";
import InvalidQueue from "../../components/InvalidQueue";

export default function AttackPage() {
  const router = useRouter();
  const { id } = router.query;

  const [target, setTarget] = useState(null);
  const [running, setRunning] = useState(false);

  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState("");

  const [validBytes, setValidBytes] = useState([]);
  const [invalidQueue, setInvalidQueue] = useState([]);

  const [current, setCurrent] = useState(null);
  const [speed, setSpeed] = useState(10);

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
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ ciphertext: cipher }),
    });
    return res.json();
  };

  const start = async () => {
    setRunning(true);
    setProgress(0);
    setResult("");
    setValidBytes([]);
    setInvalidQueue([]);

    const plain = await runPaddingAttack(
      target.ciphertext,
      oracle,
      (log) => {
        setCurrent(log);

        if (log.progress !== undefined) {
          setProgress(log.progress);
        }

        if (log.status === "valid") {
          setValidBytes((v) => [...v, log]);
        } else {
          setInvalidQueue((q) => {
            const updated = [...q, log];
            return updated.slice(-50); // fixed queue
          });
        }

        if (log.recoveredText) {
          setResult(log.recoveredText);
        }
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

          <AttackBlockView
            ciphertext={target.ciphertext}
            current={current}
          />

          {/* Progress */}
          <div className="bg-white border rounded-xl p-4">
            <div className="flex justify-between text-sm text-[#6b7280] mb-2">
              <span>Decryption Progress</span>
              <span>{Math.floor(progress)}%</span>
            </div>

            <div className="w-full bg-[#e5e7eb] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#111827] h-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Result */}
          <div className="bg-white border rounded-xl p-4">
            <div className="text-sm text-[#6b7280] mb-2">
              Recovered Plaintext (live)
            </div>
            <div className="font-mono text-sm text-[#111827] break-all">
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

          <ValidBytes data={validBytes} />

          <InvalidQueue data={invalidQueue} />
        </div>
      </div>
    </div>
  );
}