import { rawDecrypt, isValidPadding } from "../../lib/crypto";

let vulnerable = true;

export default function handler(req, res) {
  const { ciphertext } = req.body;

  try {
    const decrypted = rawDecrypt(ciphertext);

    if (!vulnerable) {
      return res.json({ status: "valid" }); // constant response
    }

    const valid = isValidPadding(decrypted);

    res.json({
      status: valid ? "valid" : "invalid",
    });
  } catch {
    res.json({ status: "invalid" });
  }
}