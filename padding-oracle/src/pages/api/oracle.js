export default function handler(req, res) {
  const { ciphertext } = req.body;

  // simulate padding validity randomly
  const valid = Math.random() > 0.7;

  res.json({ status: valid ? "valid" : "invalid" });
}