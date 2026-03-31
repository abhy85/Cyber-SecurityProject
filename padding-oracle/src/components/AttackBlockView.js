import { splitBlocks, toHex } from "../lib/blocks";

export default function AttackBlockView({ ciphertext }) {
  const blocks = splitBlocks(ciphertext);

  return (
    <div className="bg-slate-800 p-4 rounded-xl">
      <div className="mb-3 text-sm text-slate-400">
        Cipher Blocks
      </div>

      <div className="flex gap-2 flex-wrap">
        {blocks.map((b, i) => (
          <div
            key={i}
            className="bg-slate-700 px-3 py-2 rounded-lg text-xs"
          >
            {toHex(b)}
          </div>
        ))}
      </div>
    </div>
  );
}