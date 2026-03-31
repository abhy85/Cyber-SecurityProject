import CryptoJS from "crypto-js";

const KEY = CryptoJS.enc.Hex.parse(
  "00112233445566778899aabbccddeeff"
);

export function encrypt(text) {
  const iv = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(text, KEY, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
}

// NORMAL decrypt (used by server logic)
export function decrypt(base64) {
  const raw = CryptoJS.enc.Base64.parse(base64);

  const iv = CryptoJS.lib.WordArray.create(
    raw.words.slice(0, 4),
    16
  );

  const ciphertext = CryptoJS.lib.WordArray.create(
    raw.words.slice(4),
    raw.sigBytes - 16
  );

  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext },
    KEY,
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return decrypted.toString(CryptoJS.enc.Utf8);
}

// RAW decrypt WITHOUT padding removal (for oracle)
export function rawDecrypt(base64) {
  const raw = CryptoJS.enc.Base64.parse(base64);

  const iv = CryptoJS.lib.WordArray.create(
    raw.words.slice(0, 4),
    16
  );

  const ciphertext = CryptoJS.lib.WordArray.create(
    raw.words.slice(4),
    raw.sigBytes - 16
  );

  return CryptoJS.AES.decrypt(
    { ciphertext },
    KEY,
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.NoPadding,
    }
  );
}

// PKCS#7 padding validation
export function isValidPadding(wordArray) {
  const bytes = wordArray.sigBytes;
  const data = wordArray.words;

  const lastByte =
    (data[Math.floor((bytes - 1) / 4)] >>
      (24 - ((bytes - 1) % 4) * 8)) &
    0xff;

  if (lastByte <= 0 || lastByte > 16) return false;

  for (let i = 0; i < lastByte; i++) {
    const byte =
      (data[Math.floor((bytes - 1 - i) / 4)] >>
        (24 - ((bytes - 1 - i) % 4) * 8)) &
      0xff;

    if (byte !== lastByte) return false;
  }

  return true;
}