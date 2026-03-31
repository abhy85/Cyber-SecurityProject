export default function BlockView({ blocks }) {
  return (
    <div className="flex gap-2">
      {blocks.map((b, i) => (
        <div key={i} className="p-3 bg-slate-700 rounded">
          {b}
        </div>
      ))}
    </div>
  );
}