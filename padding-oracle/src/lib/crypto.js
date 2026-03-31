import CryptoJS from "crypto-js";

const KEY = CryptoJS.enc.Hex.parse("00112233445566778899aabbccddeeff");
const IV = CryptoJS.enc.Hex.parse("0102030405060708");

export function encrypt(text) {
  const encrypted = CryptoJS.AES.encrypt(text, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

export function decrypt(cipher) {
  const decrypted = CryptoJS.AES.decrypt(cipher, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}