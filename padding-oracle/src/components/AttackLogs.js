import { motion } from "framer-motion";

export default function AttackLogs({ logs }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl h-100 overflow-y-auto mt-4">
      {logs.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-xs ${
            l.status === "valid"
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          Byte {l.byte} → Guess {l.guess} →{" "}
          {l.status}
        </motion.div>
      ))}
    </div>
  );
}