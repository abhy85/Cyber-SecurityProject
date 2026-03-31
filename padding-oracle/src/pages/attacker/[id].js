import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { runPaddingAttack } from "../../lib/attack";
import BlockVisualizer from "../../components/BlockVisualizer";
import AttackSidebar from "../../components/AttackSidebar";

export default function AttackPage() {
  const router = useRouter();
  const { id } = router.query;

  const [target, setTarget] = useState(null);
  const [running, setRunning] = useState(false);

  const [speed, setSpeed] = useState(0);
  const [fastMode, setFastMode] = useState(true);

  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(null);
  const [valid, setValid] = useState([]);
  const [invalid, setInvalid] = useState([]);
  const [plaintext, setPlaintext] = useState("");

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
    setProgress(0);
    setValid([]);
    setInvalid([]);
    setPlaintext("");

    await runPaddingAttack(
      target.ciphertext,
      oracle,
      (log) => {
        setCurrent({ ...log });

        console.log(log);
        
        if (log.progress !== undefined) {
          setProgress(log.progress);
        }

        if (log.status === "valid") {
          setValid((v) => [...v, {...log}]);
        } else if (!fastMode) {
          setInvalid((q) => [...q.slice(-30), {...log}]);
        }

        if (log.recoveredText) {
          setPlaintext(log.recoveredText);
        }
      },
      speed,
      fastMode
    );

    setRunning(false);
  };

  if (!target) return null;

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* TOP BAR */}
        <div className="bg-white border rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-[#6b7280]">
                Padding Oracle Attack
              </div>
              <div className="text-lg font-semibold text-[#111827]">
                {running ? "Running..." : "Ready"}
              </div>
            </div>

            <div className="w-64">
              <div className="h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                <div
                  className="h-full bg-black transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-xs text-[#9ca3af] mt-1 text-right">
                {Math.floor(progress)}%
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">

          {/* MAIN VISUAL */}
          <div className="col-span-2 space-y-4">

            <BlockVisualizer
              ciphertext={target.ciphertext}
              current={current}
              valid={valid}
            />

            <div className="bg-white border rounded-xl p-4">
              <div className="text-sm text-[#4e5158] mb-2">
                Recovered Plaintext
              </div>
              <div className="font-mono text-[#73767c] text-sm break-all">
                {String(plaintext) || "..."}
              </div>
            </div>
          </div>

          <AttackSidebar
            start={start}
            running={running}
            current={current}
            valid={valid}
            invalid={invalid}
            speed={speed}
            setSpeed={setSpeed}
            fastMode={fastMode}
            setFastMode={setFastMode}
          />
        </div>
      </div>
    </div>
  );
}