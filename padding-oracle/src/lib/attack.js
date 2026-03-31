import { splitBlocks } from "./blocks";

export async function runPaddingAttack(
  cipher,
  oracle,
  onUpdate,
  speed = 20
) {
  const blocks = splitBlocks(cipher);

  let plaintext = "";

  for (let b = blocks.length - 1; b > 0; b--) {
    const curr = blocks[b];
    const prev = blocks[b - 1];

    let intermediate = new Array(16).fill(0);
    let recovered = new Array(16).fill(0);

    for (let i = 15; i >= 0; i--) {
      const pad = 16 - i;

      for (let guess = 0; guess < 256; guess++) {
        let modified = prev.split("").map((c) => c.charCodeAt(0));

        for (let j = 15; j > i; j--) {
          modified[j] = intermediate[j] ^ pad;
        }

        modified[i] = guess;

        const attackBlock = String.fromCharCode(...modified);
        const forged =
          btoa(attackBlock + curr);

        const res = await oracle(forged);

        onUpdate({
          block: b,
          byte: i,
          guess,
          status: res.status,
        });

        if (res.status === "valid") {
          intermediate[i] = guess ^ pad;
          recovered[i] =
            intermediate[i] ^
            prev.charCodeAt(i);

          break;
        }

        await new Promise((r) =>
          setTimeout(r, speed)
        );
      }
    }

    plaintext =
      String.fromCharCode(...recovered) +
      plaintext;
  }

  return plaintext;
}