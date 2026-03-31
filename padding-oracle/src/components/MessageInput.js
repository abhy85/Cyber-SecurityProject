import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  return (
    <div className="flex gap-2 p-2">
      <input
        className="flex-1 p-2 rounded bg-slate-800"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          onSend(text);
          setText("");
        }}
        className="bg-indigo-500 px-4 rounded"
      >
        Send
      </button>
    </div>
  );
}