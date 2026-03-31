import { splitBlocks, bytesToBase64, base64ToBytes } from "./blocks";

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

  for (let b = 1; b < blocks.length; b++) {
    const prev = blocks[b - 1];
    const curr = blocks[b];

    let recovered = new Uint8Array(16);
    let modified = new Uint8Array(prev);

    for (let i = 15; i >= 0; i--) {
      const pad = 16 - i;
      let found = false;

      for (let guess = 0; guess < 256; guess++) {
        modified = new Uint8Array(prev);

        for (let k = i + 1; k < 16; k++) {
          modified[k] = prev[k] ^ recovered[k] ^ pad;
        }

        modified[i] = guess;

        const forged = new Uint8Array(16 + curr.length);
        forged.set(modified, 0);
        forged.set(curr, 16);

        const payload = bytesToBase64(forged);
        const res = await oracle(payload);

        if (res.status !== "valid") {
          if (!fastMode) {
            onUpdate({
              block: b,
              byte: i,
              guess,
              status: "invalid",
            });
          }
          continue;
        }

        // valid byte found
        recovered[i] = guess ^ pad ^ prev[i];
        processed++;

        const progress = (processed / totalBytes) * 100;

        onUpdate({
          block: b,
          byte: i,
          guess,
          status: "valid",
          progress,
          recoveredText: new TextDecoder().decode(
            new Uint8Array([...plaintextBytes, ...recovered])
          ),
        });

        found = true;
        break;
      }

      if (!found) {
        recovered[i] = 0;
      }

      if (!fastMode && speed > 0) {
        await new Promise((r) => setTimeout(r, speed));
      }
    }

    // append full block AFTER finishing it
    plaintextBytes.push(...recovered);
  }

  return new TextDecoder().decode(new Uint8Array(plaintextBytes));
}