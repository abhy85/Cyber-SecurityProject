import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-50 bg-[#f7f5f2]/80 backdrop-blur border-b border-[#e7e5e4]">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        
        <Link href="/">
          <span className="text-lg font-semibold text-[#111827] tracking-tight">
            Padding Oracle Attack
          </span>
        </Link>

        <div className="hidden md:flex gap-8 text-sm text-[#6b7280]">
          <Link href="/client" className="hover:text-black transition">Client</Link>
          <Link href="/server" className="hover:text-black transition">Server</Link>
          <Link href="/attacker" className="hover:text-black transition">Attacker</Link>
        </div>

        <Link href="/client">
          <button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white text-sm px-4 py-2 rounded-lg shadow-sm transition">
            Open App
          </button>
        </Link>
      </div>
    </nav>
  );
}