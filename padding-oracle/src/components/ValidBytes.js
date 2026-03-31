export default function ValidBytes({ data }) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <div className="text-sm text-[#6b7280] mb-2">
        Valid Guesses (Recovered Bytes)
      </div>

      <div className="space-y-1 max-h-40 overflow-y-auto">
        {data.map((l, i) => (
          <div key={i} className="text-xs font-mono text-green-600">
            B{l.block} Byte {l.byte} → {l.guess}
          </div>
        ))}
      </div>
    </div>
  );
}