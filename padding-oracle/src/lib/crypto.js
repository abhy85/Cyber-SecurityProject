// lib/crypto.js
import CryptoJS from "crypto-js";

const KEY = CryptoJS.enc.Utf8.parse("Sixteen byte key");
const IV = CryptoJS.enc.Utf8.parse("InitializationVe");

export function encrypt(message) {
  const encrypted = CryptoJS.AES.encrypt(message, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

export function decrypt(ciphertextBase64) {
  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext: CryptoJS.enc.Base64.parse(ciphertextBase64) },
    KEY,
    {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return decrypted.toString(CryptoJS.enc.Utf8);
}