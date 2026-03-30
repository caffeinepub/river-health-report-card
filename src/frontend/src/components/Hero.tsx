import { motion } from "motion/react";

export function Hero() {
  return (
    <section
      className="relative min-h-[560px] flex items-end pb-20 pt-32"
      style={{
        backgroundImage: `url('/assets/generated/river-hero.dim_1600x900.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071e34]/70 via-[#0b3a5c]/60 to-[#071e34]/80" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-semibold uppercase tracking-widest border border-white/20">
            Annual Environmental Assessment
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            RiverWatch 2024:
            <br />
            <span className="text-[#8BCF7A]">Interactive River Health</span>{" "}
            Report Card
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
            Comprehensive water quality monitoring across five river stations
            from headwaters to estuary. Explore multi-parameter environmental
            data, weighted health scores, and actionable insights to understand
            and protect our river ecosystems.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="#explore"
              className="inline-flex items-center px-6 py-3 rounded-md bg-[#0B5C8F] text-white font-semibold hover:bg-[#0a4f7a] transition-colors"
              data-ocid="hero.explore_button"
            >
              Explore Data
            </a>
            <a
              href="#methods"
              className="inline-flex items-center px-6 py-3 rounded-md bg-white/10 text-white font-semibold border border-white/30 hover:bg-white/20 transition-colors"
              data-ocid="hero.methods_button"
            >
              Our Methods
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
