import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Container from "../components/Container";

export default function Home() {
  return (
    <div className="bg-[#f7f5f2] min-h-screen text-[#111827]">
      <Navbar />

      <Container>
        <Hero />

        {/* Feature Section */}
        <div className="grid md:grid-cols-3 gap-6 pb-24">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white border border-[#e5e7eb] rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-base font-semibold text-[#111827]">
                {f.title}
              </h3>

              <p className="mt-2 text-sm text-[#6b7280] leading-relaxed">
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