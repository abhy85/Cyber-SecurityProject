let messages = [];

export default function handler(req, res) {
  const { ciphertext } = req.body;

  const id = Date.now();

  messages.push({
    id,
    ciphertext,
    time: new Date().toISOString(),
  });

  const responses = [
    "Message received and securely processed.",
    "Your request has been validated.",
    "Data integrity confirmed.",
    "Command executed successfully.",
  ];

  const reply =
    responses[Math.floor(Math.random() * responses.length)];

  res.json({ reply });
}