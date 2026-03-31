// lib/utils.js
export function base64ToBytes(base64) {
  const binary = atob(base64);
  return Uint8Array.from(binary, c => c.charCodeAt(0));
}

export function bytesToBase64(bytes) {
  let binary = "";
  bytes.forEach(b => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

export function splitBlocks(bytes, size = 16) {
  let blocks = [];
  for (let i = 0; i < bytes.length; i += size) {
    blocks.push(bytes.slice(i, i + size));
  }
  return blocks;
}