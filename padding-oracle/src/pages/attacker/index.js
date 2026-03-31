import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function AttackerHome() {
  const [msgs, setMsgs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then(setMsgs);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-xl font-semibold text-[#111827] mb-2">
          Select Target Ciphertext
        </h1>
        <p className="text-sm text-[#6b7280] mb-8">
          Choose a message to begin padding oracle attack simulation
        </p>

        <div className="space-y-4">
          {msgs.map((m) => (
            <motion.div
              key={m.id}
              whileHover={{ y: -2 }}
              className="bg-white border border-[#e5e7eb] rounded-xl p-4 cursor-pointer hover:shadow-md transition"
              onClick={() => router.push(`/attacker/${m.id}`)}
            >
              <div className="text-xs text-[#9ca3af]">
                {m.timestamp}
              </div>

              <div className="text-sm mt-2 font-mono text-[#374151] break-all">
                {m.ciphertext.slice(0, 90)}...
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}