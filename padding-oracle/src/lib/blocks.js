export function splitBlocks(base64) {
  const raw = atob(base64);
  const blocks = [];

  for (let i = 0; i < raw.length; i += 16) {
    blocks.push(raw.slice(i, i + 16));
  }

  return blocks;
}

export function toHex(str) {
  return Array.from(str)
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
    .join(" ");
}