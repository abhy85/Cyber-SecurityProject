import { motion } from "framer-motion";

export default function ChatBubble({ text, isUser }) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[65%] px-4 py-3 rounded-2xl text-sm leading-relaxed
          ${isUser 
            ? "bg-[#4f46e5] text-white rounded-br-sm" 
            : "bg-white border border-[#e5e7eb] text-[#111827] rounded-bl-sm shadow-sm"}
        `}
      >
        {text}
      </div>
    </div>
  );
}