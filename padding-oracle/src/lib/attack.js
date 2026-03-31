// lib/attack.js

export async function oracle(ciphertext) {
  const res = await fetch("/api/oracle", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ciphertext }),
  });

  const data = await res.json();
  return data.status === "valid";
}

export function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}