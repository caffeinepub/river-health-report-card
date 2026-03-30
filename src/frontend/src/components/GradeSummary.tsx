import { motion } from "motion/react";
import type { Station } from "../data/stations";
import { getGrade, getRegionalScore } from "../utils/scoring";

type Props = {
  stations: Station[];
};

const gradeLegend = [
  { letter: "A", color: "#2FAE5B", label: "Excellent", range: "90–100" },
  { letter: "B", color: "#8BCF7A", label: "Good", range: "75–89" },
  { letter: "C", color: "#F4C542", label: "Fair", range: "60–74" },
  { letter: "D", color: "#F28C28", label: "Poor", range: "45–59" },
  { letter: "F", color: "#D84B3E", label: "Critical", range: "< 45" },
];

export function GradeSummary({ stations }: Props) {
  const score = getRegionalScore(stations);
  const grade = getGrade(score);

  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-100 p-6 flex flex-col gap-4">
      <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 font-heading">
        2024 Overall Regional Grade
      </div>

      <div className="flex items-center gap-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 shadow-lg flex-shrink-0"
          style={{ borderColor: grade.color, background: `${grade.color}18` }}
        >
          <span
            className="text-5xl font-black leading-none font-heading"
            style={{ color: grade.color }}
          >
            {grade.letter}
          </span>
        </motion.div>
        <div>
          <div className="text-3xl font-black text-gray-800 font-heading">
            {score}
            <span className="text-lg font-semibold text-gray-400">/100</span>
          </div>
          <div
            className="text-sm font-semibold mt-1"
            style={{ color: grade.color }}
          >
            {grade.label}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Aggregated across {stations.length} monitoring stations
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 font-heading">
          Grade Scale
        </div>
        <div className="flex flex-col gap-2">
          {gradeLegend.map((g) => (
            <div key={g.letter} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center text-white font-black text-sm font-heading flex-shrink-0"
                style={{ background: g.color }}
              >
                {g.letter}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">
                    {g.label}
                  </span>
                  <span className="text-xs text-gray-400">{g.range}</span>
                </div>
                <div className="h-1.5 rounded-full mt-1 bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      background: g.color,
                      width: g.letter === grade.letter ? "100%" : "30%",
                      opacity: g.letter === grade.letter ? 1 : 0.3,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">
        {stations.map((st) => {
          const stScore = st.parameters
            ? Math.round(
                Object.values(st.parameters).reduce((acc, p) => {
                  const s =
                    p.value >= p.idealMin && p.value <= p.idealMax
                      ? 100
                      : p.value < p.idealMin
                        ? Math.max(
                            0,
                            100 -
                              ((p.idealMin - p.value) /
                                (p.idealMin * 0.5 || 1)) *
                                100,
                          )
                        : Math.max(
                            0,
                            100 -
                              ((p.value - p.idealMax) /
                                (p.idealMax * 0.5 || 1)) *
                                100,
                          );
                  return acc + s * (p.weight / 100);
                }, 0) * 10,
              ) / 10
            : 0;
          const stGrade = getGrade(stScore);
          return (
            <div key={st.id} className="text-center">
              <div className="text-xs text-gray-500 truncate">{st.name}</div>
              <div
                className="text-lg font-black font-heading"
                style={{ color: stGrade.color }}
              >
                {stGrade.letter}
              </div>
              <div className="text-xs text-gray-400">{stScore}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
