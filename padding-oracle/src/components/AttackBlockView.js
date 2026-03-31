import { splitBlocks, toHex } from "../lib/blocks";

export default function AttackBlockView({ ciphertext, current }) {
  const blocks = splitBlocks(ciphertext);

  return (
    <div className="bg-white border rounded-xl p-4">
      <div className="text-sm text-[#6b7280] mb-3">
        Cipher Blocks (active highlighted)
      </div>

      <div className="flex gap-2 flex-wrap">
        {blocks.map((b, i) => (
          <div
            key={i}
            className={`
              px-3 py-2 rounded-lg text-xs font-mono border
              ${current?.block === i
                ? "bg-black text-white"
                : "bg-[#f9fafb]"}
            `}
          >
            {toHex(b)}
          </div>
        ))}
      </div>

      {current && (
        <div className="mt-3 text-xs text-[#6b7280]">
          Attacking Block {current.block}, Byte {current.byte}
        </div>
      )}
    </div>
  );
}