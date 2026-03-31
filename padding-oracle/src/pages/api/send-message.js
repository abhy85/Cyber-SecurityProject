import { readDB, writeDB } from "../../lib/db";
import { decrypt, encrypt } from "../../lib/crypto";

export default function handler(req, res) {
  const { ciphertext } = req.body;

  const messages = readDB();

  let plaintext = "";
  try {
    plaintext = decrypt(ciphertext);
  } catch {
    plaintext = "[decryption error]";
  }

  const replyPlain = "Message received and securely processed.";

  const replyCipher = encrypt(replyPlain);

  const newEntry = {
    id: Date.now(),
    ciphertext,
    responseCipher: replyCipher,
    timestamp: new Date().toISOString(),
  };

  messages.push(newEntry);
  writeDB(messages);

  res.json({
    replyCipher,
  });
}