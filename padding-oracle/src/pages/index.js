export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-3xl mb-4">Padding Oracle Simulator</h1>
      <ul className="space-y-2">
        <li><a href="/client">Client</a></li>
        <li><a href="/server">Server</a></li>
        <li><a href="/attacker">Attacker</a></li>
      </ul>
    </div>
  );
}