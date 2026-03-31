import { rawDecrypt, isValidPadding } from "../../lib/crypto";

export default function handler(req, res) {
  const { ciphertext } = req.body;

  try {
    const decrypted = rawDecrypt(ciphertext);

    const valid = isValidPadding(decrypted);

    res.json({
      status: valid ? "valid" : "invalid",
    });
  } catch {
    res.json({ status: "invalid" });
  }
}