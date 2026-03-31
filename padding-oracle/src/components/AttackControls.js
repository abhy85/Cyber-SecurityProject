export default function AttackControls({
  start,
  running,
  speed,
  setSpeed,
}) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <button
        onClick={start}
        disabled={running}
        className="w-full bg-[#111827] text-white py-2 rounded-lg mb-4 text-sm"
      >
        {running ? "Running..." : "Start Attack"}
      </button>

      <div className="text-xs text-[#6b7280] mb-2">
        Speed
      </div>

      <input
        type="range"
        min="1"
        max="50"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}