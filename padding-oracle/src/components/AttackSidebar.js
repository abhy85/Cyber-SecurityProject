export default function AttackSidebar({
  start,
  running,
  current,
  valid,
  invalid,
  speed,
  setSpeed,
  fastMode,
  setFastMode,
}) {
  return (
    <div className="space-y-4">

      {/* Controls */}
      <div className="bg-white border rounded-xl p-5">

        <button
          onClick={start}
          disabled={running}
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          {running ? "Running..." : "Start Attack"}
        </button>

        {/* Mode Toggle */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-600">Fast Mode</span>
          <input
            type="checkbox"
            checked={fastMode}
            onChange={(e) =>
              setFastMode(e.target.checked)
            }
          />
        </div>

        {/* Speed */}
        {!fastMode && (
          <div className="mt-4">
            <div className="text-xs text-gray-500 mb-1">
              Animation Speed
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) =>
                setSpeed(Number(e.target.value))
              }
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Current */}
      <div className="bg-white border rounded-xl p-4">
        <div className="text-xs text-gray-500 mb-2">
          Current Attempt
        </div>
        {current && (
          <div className="font-mono text-xs text-gray-800">
            Block {current.block} <br />
            Byte {current.byte} <br />
            {current.guess !== undefined && (
              <>Guess {current.guess}</>
            )}
          </div>
        )}
      </div>

      {/* Valid */}
      <div className="bg-white border rounded-xl p-4 max-h-40 overflow-y-auto">
        <div className="text-xs text-gray-500 mb-2">
          Recovered Bytes
        </div>
        {valid.map((v, i) => (
          <div key={i} className="text-xs font-mono text-green-600">
            B{v.block} → {v.byte}
          </div>
        ))}
      </div>

      {/* Invalid (only if not fast mode) */}
      {!fastMode && (
        <div className="bg-white border rounded-xl p-4 max-h-40 overflow-y-auto">
          <div className="text-xs text-gray-500 mb-2">
            Attempts
          </div>
          {invalid.map((v, i) => (
            <div key={i} className="text-xs font-mono text-red-500">
              {v.guess}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}