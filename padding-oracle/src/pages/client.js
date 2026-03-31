import ChatBubble from "../components/ChatBubble";
import MessageInput from "../components/MessageInput";
import { encrypt } from "../lib/crypto";
import { useState } from "react";

export default function Client() {
  const [chat, setChat] = useState([]);

  const send = async (msg) => {
    const cipher = encrypt(msg);

    setChat((c) => [...c, { text: msg, user: true }]);

    const res = await fetch("/api/send-message", {
      method: "POST",
      body: JSON.stringify({ ciphertext: cipher }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    setChat((c) => [...c, { text: data.reply, user: false }]);
  };

  return (
    <div className="p-4">
      <div className="h-[80vh] overflow-y-auto">
        {chat.map((m, i) => (
          <ChatBubble key={i} text={m.text} isUser={m.user} />
        ))}
      </div>
      <MessageInput onSend={send} />
    </div>
  );
}