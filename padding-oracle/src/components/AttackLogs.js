import { motion } from "framer-motion";

export default function AttackLogs({ logs }) {
  return (
    <div className="bg-white border rounded-xl p-4 h-[400px] overflow-y-auto">
      {logs.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`
            text-xs font-mono mb-1
            ${l.status === "valid"
              ? "text-green-600"
              : "text-red-500"}
          `}
        >
          B{l.block} | Byte {l.byte} → {l.guess} → {l.status}
        </motion.div>
      ))}
    </div>
  );
}