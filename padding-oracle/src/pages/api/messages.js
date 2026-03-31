// pages/api/messages.js
let messages = [];

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(messages);
  }

  if (req.method === "POST") {
    const { ciphertext } = req.body;

    const msg = {
      id: Date.now(),
      ciphertext,
    };

    messages.push(msg);

    return res.status(200).json({ success: true, msg });
  }
}