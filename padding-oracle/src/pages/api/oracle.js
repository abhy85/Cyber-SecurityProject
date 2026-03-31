// pages/api/oracle.js
import CryptoJS from "crypto-js";

const KEY = CryptoJS.enc.Utf8.parse("Sixteen byte key");
const IV = CryptoJS.enc.Utf8.parse("InitializationVe");

function hasValidPadding(bytes) {
  const pad = bytes[bytes.length - 1];

  if (pad < 1 || pad > 16) return false;

  for (let i = 0; i < pad; i++) {
    if (bytes[bytes.length - 1 - i] !== pad) return false;
  }

  return true;
}

export default function handler(req, res) {
  const { ciphertext } = req.body;

  try {
    const cipherParams = {
      ciphertext: CryptoJS.enc.Base64.parse(ciphertext),
    };

    const decrypted = CryptoJS.AES.decrypt(cipherParams, KEY, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.NoPadding, // IMPORTANT
    });

    const bytes = decrypted.words
      .map(word => [
        (word >> 24) & 0xff,
        (word >> 16) & 0xff,
        (word >> 8) & 0xff,
        word & 0xff,
      ])
      .flat()
      .slice(0, decrypted.sigBytes);

    if (hasValidPadding(bytes)) {
      return res.json({ status: "valid" });
    } else {
      return res.json({ status: "invalid" });
    }
  } catch {
    return res.json({ status: "invalid" });
  }
}