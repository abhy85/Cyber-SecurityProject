

export function base64ToBytes(base64) {
  const binary = atob(base64);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

export function bytesToBase64(bytes) {
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

export function splitBlocks(base64) {
  const bytes = base64ToBytes(base64);

  const blocks = [];
  for (let i = 0; i < bytes.length; i += 16) {
    blocks.push(bytes.slice(i, i + 16));
  }

  return blocks;
}