import { motion } from "motion/react";

export function ScienceMethods() {
  return (
    <section id="methods" className="py-16 bg-[#F4F6F8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#0B5C8F] font-heading">
            Transparency & Rigor
          </span>
          <h2 className="text-3xl font-black text-gray-800 font-heading mt-2">
            Science & Methods
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-card"
          >
            <div className="w-10 h-10 rounded-full bg-[#0B5C8F]/10 flex items-center justify-center mb-4">
              <span className="text-[#0B5C8F] font-black text-lg font-heading">
                Σ
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 font-heading mb-3">
              Weighted Scoring Formula
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Each parameter receives an individual score from 0–100 based on
              how closely the measured value falls within the scientifically
              established ideal range. Values within range score 100. Deviations
              are penalized proportionally based on distance from the range
              boundary relative to a reference deviation (50% of the ideal
              minimum or maximum).
            </p>
            <div className="mt-4 bg-[#F4F6F8] rounded-lg p-3 text-xs font-mono text-gray-700">
              Score = max(0, 100 − (deviation / reference) × 100)
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-card"
          >
            <div className="w-10 h-10 rounded-full bg-[#0B5C8F]/10 flex items-center justify-center mb-4">
              <span className="text-[#0B5C8F] font-black text-lg font-heading">
                ⚖
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 font-heading mb-3">
              Parameter Weights
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              The overall station score is a weighted sum of all parameter
              scores. Weights reflect ecological importance and regulatory
              significance:
            </p>
            <ul className="space-y-1 text-xs text-gray-600">
              {[
                ["Dissolved Oxygen", "20%"],
                ["pH Levels", "15%"],
                ["Turbidity", "15%"],
                ["Nitrates", "15%"],
                ["E. coli", "15%"],
                ["Temperature", "10%"],
                ["Flow Rate", "5%"],
                ["Macroinvertebrates", "5%"],
              ].map(([name, weight]) => (
                <li key={name} className="flex justify-between">
                  <span>{name}</span>
                  <span className="font-semibold text-[#0B5C8F]">{weight}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-card"
          >
            <div className="w-10 h-10 rounded-full bg-[#0B5C8F]/10 flex items-center justify-center mb-4">
              <span className="text-[#0B5C8F] font-black text-lg font-heading">
                A
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 font-heading mb-3">
              Grade Classification
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Final scores are converted to letter grades following threshold
              classifications aligned with EPA and state environmental agency
              standards:
            </p>
            <div className="space-y-2">
              {[
                {
                  letter: "A",
                  range: "90–100",
                  label: "Excellent – Pristine conditions",
                  color: "#2FAE5B",
                },
                {
                  letter: "B",
                  range: "75–89",
                  label: "Good – Minor impairments",
                  color: "#8BCF7A",
                },
                {
                  letter: "C",
                  range: "60–74",
                  label: "Fair – Moderate concerns",
                  color: "#F4C542",
                },
                {
                  letter: "D",
                  range: "45–59",
                  label: "Poor – Significant degradation",
                  color: "#F28C28",
                },
                {
                  letter: "F",
                  range: "< 45",
                  label: "Critical – Severe impairment",
                  color: "#D84B3E",
                },
              ].map((g) => (
                <div key={g.letter} className="flex items-center gap-2 text-xs">
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center text-white font-black text-xs font-heading flex-shrink-0"
                    style={{ background: g.color }}
                  >
                    {g.letter}
                  </div>
                  <span className="text-gray-500 w-14 flex-shrink-0">
                    {g.range}
                  </span>
                  <span className="text-gray-600">{g.label.split("–")[1]}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-white rounded-xl p-6 shadow-card"
        >
          <h3 className="text-lg font-bold text-gray-800 font-heading mb-3">
            Data Collection & Quality Assurance
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <p>
              Water samples are collected monthly at five permanent monitoring
              stations spanning the full river continuum from mountain
              headwaters to coastal estuary. Field measurements (dissolved
              oxygen, pH, temperature, turbidity) are taken in situ using
              calibrated multiparameter sondes. Laboratory analyses (nitrates,
              E. coli) follow standard EPA methods (Method 300.0 for nitrates;
              Method 1603 for E. coli).
            </p>
            <p>
              Flow rate data are derived from USGS stream gauges and
              supplemented with velocity-area measurements during high-flow
              events. Macroinvertebrate surveys follow the Rapid Bioassessment
              Protocol (RBP) and are conducted seasonally by trained field
              crews. All data undergo multi-level QA/QC review including
              laboratory blanks, duplicate samples, and inter-laboratory
              comparisons.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
