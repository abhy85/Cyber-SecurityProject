import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Container from "../components/Container";

export default function Home() {
  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <Navbar />

      <Container>
        <Hero />

        {/* Subtle Feature Section */}
        <div className="grid md:grid-cols-3 gap-6 pb-24">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 hover:bg-slate-800 transition"
            >
              <h3 className="text-lg font-medium text-slate-100">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

const features = [
  {
    title: "Client Simulation",
    desc: "Send encrypted messages through a chat-like interface with real-time responses.",
  },
  {
    title: "Server Monitoring",
    desc: "Observe ciphertext logs and analyze encrypted communication flow.",
  },
  {
    title: "Attack Visualization",
    desc: "Perform a step-by-step padding oracle attack with full byte-level insight.",
  },
];