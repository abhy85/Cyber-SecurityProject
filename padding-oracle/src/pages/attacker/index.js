
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
    <div className="min-h-screen">
      <Navbar />

      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl mb-6">
          Select Target Ciphertext
        </h1>

        <div className="space-y-4">
          {msgs.map((m) => (
            <motion.div
              key={m.id}
              whileHover={{ scale: 1.02 }}
              className="bg-slate-800 p-4 rounded-xl cursor-pointer"
              onClick={() =>
                router.push(`/attacker/${m.id}`)
              }
            >
              <div className="text-xs text-slate-400">
                {m.timestamp}
              </div>

              <div className="text-sm mt-2 break-all text-indigo-300">
                {m.ciphertext.slice(0, 80)}...
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}