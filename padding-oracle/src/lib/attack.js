export async function paddingOracleAttack(cipher, oracle) {
  const bytes = atob(cipher);
  let recovered = "";

  for (let i = bytes.length - 1; i >= 0; i--) {
    for (let guess = 0; guess < 256; guess++) {
      const modified = bytes.slice(0, i) + String.fromCharCode(guess);

      const res = await oracle(btoa(modified));

      if (res.status === "valid") {
        const char = String.fromCharCode(guess ^ 1);
        recovered = char + recovered;
        break;
      }
    }
  }

  return recovered;
}