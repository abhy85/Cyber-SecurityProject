import { useState } from "react";


export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  return (
    <div className="border-t border-[#e5e7eb] bg-[#f7f5f2] p-4">
      <div className="max-w-4xl mx-auto flex gap-3 items-center bg-white border border-[#e5e7eb] rounded-xl px-3 py-2 shadow-sm">
        
        <input
          className="flex-1 bg-transparent outline-none text-sm text-[#111827] placeholder:text-[#9ca3af]"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter" && text.trim() !== "") {
          //     onSend(text);
          //     setText("");
          //   }
          // }}
        />

        <button
          onClick={() => {
            onSend(text);
            setText("");
          }}
          className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-4 py-2 rounded-lg text-sm transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}