import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ChatBubble from "../components/ChatBubble";
import MessageInput from "../components/MessageInput";
import { encrypt, decrypt } from "../lib/crypto";

export default function Client() {
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch existing messages on load
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch("/api/messages");
      const data = await res.json();

      // Decrypt messages locally
      const formatted = [];

      data.forEach((m) => {
        try {
          const userText = decrypt(m.ciphertext);
          formatted.push({ text: userText, user: true });

          if (m.responseCipher) {
            const serverText = decrypt(m.responseCipher);
            formatted.push({ text: serverText, user: false });
          }
        } catch (e) {
          // skip corrupted messages
        }
      });

      setChat(formatted);
    };

    fetchMessages();
  }, []);

  const sendMessage = async (text) => {
    if (!text) return;

    const cipher = encrypt(text);

    setChat((c) => [...c, { text, user: true }]);
    setLoading(true);

    const res = await fetch("/api/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ciphertext: cipher }),
    });

    const data = await res.json();
    const replyPlain = decrypt(data.replyCipher);

    setTimeout(() => {
      setChat((c) => [...c, { text: replyPlain, user: false }]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="h-screen flex flex-col bg-[#f7f5f2]">
      <Navbar />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
          
          {chat.map((msg, i) => (
            <ChatBubble key={i} text={msg.text} isUser={msg.user} />
          ))}

          {loading && (
            <div className="text-sm text-[#9ca3af] px-2">
              Server is typing...
            </div>
          )}
        </div>
      </div>

      <MessageInput onSend={sendMessage} />
    </div>
  );
}