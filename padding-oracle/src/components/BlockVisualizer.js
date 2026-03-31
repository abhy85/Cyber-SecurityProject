import { splitBlocks } from "../lib/blocks";
import { useMemo } from "react";

export default function BlockVisualizer({ ciphertext, current, valid }) {
  const blocks = useMemo(
    () => splitBlocks(ciphertext),
    [ciphertext]
  );

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
      <div className="text-xs text-gray-800 mb-2 pb-2 break-all">
        Cipher Text: {ciphertext}
      </div>

      <div className="text-sm text-gray-600 mb-4">
        Cipher Blocks
      </div>

      {blocks.map((block, bi) => (
        <div key={bi} className="mb-5">

          <div className="text-xs text-gray-600 mb-2">
            Block {bi}
          </div>

          <div className="grid grid-cols-16 gap-1">
            {block.map((byte, i) => {
              // 🔥 CORRECT LOGIC (MODIFIED BLOCK = block-1)
              const isActive =
                current?.block - 1 === bi &&
                current?.byte === i;

              const isRecovered = valid.some(
                (v) =>
                  v.block - 1 === bi &&
                  v.byte === i
              );

              return (
                <div
                  key={i}
                  className={`
                    h-8 flex items-center justify-center rounded-md text-[11px] font-mono border transition-all
                    ${isActive
                      ? "bg-black text-white scale-110"
                      : isRecovered
                      ? "bg-green-200 text-green-900 border-green-300"
                      : "bg-[#f9fafb] text-gray-600 border-[#e5e7eb]"
                    }
                  `}
                >
                  {byte.toString(16).padStart(2, "0")}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}