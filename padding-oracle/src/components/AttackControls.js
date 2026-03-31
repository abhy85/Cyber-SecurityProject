export default function AttackControls({
  start,
  running,
  speed,
  setSpeed,
}) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl">
      <button
        onClick={start}
        disabled={running}
        className="w-full bg-indigo-500 py-2 rounded-lg mb-4"
      >
        {running ? "Running..." : "Start Attack"}
      </button>

      <div className="text-sm text-slate-400 mb-2">
        Speed
      </div>

      <input
        type="range"
        min="1"
        max="50"
        value={speed}
        onChange={(e) =>
          setSpeed(Number(e.target.value))
        }
        className="w-full"
      />
    </div>
  );
}