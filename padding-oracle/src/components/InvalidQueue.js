export default function InvalidQueue({ data }) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <div className="text-sm text-[#6b7280] mb-2">
        Recent Attempts
      </div>

      <div className="space-y-1 max-h-40 overflow-y-auto">
        {data.map((l, i) => (
          <div key={i} className="text-xs font-mono text-red-500">
            B{l.block} Byte {l.byte} → {l.guess}
          </div>
        ))}
      </div>
    </div>
  );
}