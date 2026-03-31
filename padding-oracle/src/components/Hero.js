import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-semibold tracking-tight text-slate-100"
        >
          Padding Oracle Attack
          <br />
          <span className="text-indigo-500">Interactive Simulation</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-slate-400 text-lg leading-relaxed"
        >
          Visualize how encrypted data can be exploited through oracle responses.
          Explore client-server communication and simulate real-world cryptographic attacks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex justify-center gap-4"
        >
          <a href="/client">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl transition">
              Start Simulation
            </button>
          </a>

          <a href="/attacker">
            <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded-2xl border border-slate-700 transition">
              View Attack
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}