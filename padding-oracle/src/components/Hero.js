import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative py-28 md:py-36 bg-[#f7f5f2] overflow-hidden">
      
      {/* subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-semibold tracking-tight text-[#111827]"
        >
          Padding Oracle Attack
          <br />
          <span className="text-[#6b7280]">
            Interactive Simulation
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-[#6b7280] text-lg leading-relaxed max-w-2xl mx-auto"
        >
          Explore how encrypted communication can be exploited through oracle feedback.
          Simulate client-server interactions and understand real-world cryptographic flaws.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex justify-center gap-4"
        >
          <a href="/client">
            <button className="bg-[#111827] hover:bg-black text-white px-6 py-3 rounded-xl text-sm font-medium transition shadow-sm">
              Start Simulation
            </button>
          </a>

          <a href="/attacker">
            <button className="bg-white hover:bg-[#f3f4f6] text-[#111827] px-6 py-3 rounded-xl text-sm font-medium border border-[#e5e7eb] transition">
              View Attack
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}