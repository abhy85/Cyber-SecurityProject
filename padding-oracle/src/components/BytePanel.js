export default function BytePanel({ logs }) {
  return (
    <div className="bg-slate-800 p-4 rounded h-64 overflow-y-auto">
      {logs.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </div>
  );
}