// components/ClientPanel.js
import { useState } from "react";
import { encrypt, decrypt } from "../lib/crypto";

export default function ClientPanel() {
  const [message, setMessage] = useState("");
  const [cipher, setCipher] = useState("");

  async function send() {
    const c = encrypt(message);
    setCipher(c);

    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ciphertext: c }),
    });
  }

  return (
    <div className="p-4 border rounded w-full">
      <h2 className="font-bold mb-2">Client</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Enter message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />

      <button
        onClick={send}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Encrypt & Send
      </button>

      <div className="mt-2 text-sm break-all">
        Ciphertext: {cipher}
      </div>
    </div>
  );
}