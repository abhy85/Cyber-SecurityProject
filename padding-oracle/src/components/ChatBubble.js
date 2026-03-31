import { motion } from "framer-motion";

export default function ChatBubble({ text, isUser }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-3 m-2 rounded-lg max-w-xs ${
        isUser ? "bg-indigo-500 ml-auto" : "bg-slate-700"
      }`}
    >
      {text}
    </motion.div>
  );
}