import { Minus, TrendingDown, TrendingUp, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import {
  type ParameterKey,
  type Station,
  parameterMeta,
} from "../data/stations";
import { getGrade, scoreParameter } from "../utils/scoring";
import { Sparkline } from "./Sparkline";

type Props = {
  paramKey: ParameterKey | null;
  stations: Station[];
  onClose: () => void;
};

export function ParameterModal({ paramKey, stations, onClose }: Props) {
  useEffect(() => {
    if (paramKey) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [paramKey, onClose]);

  useEffect(() => {
    if (paramKey) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [paramKey]);

  const getTrend = (trend: number[]) => {
    const first = trend[0];
    const last = trend[trend.length - 1];
    if (last > first * 1.02) return "up";
    if (last < first * 0.98) return "down";
    return "stable";
  };

  return (
    <AnimatePresence>
      {paramKey &&
        (() => {
          const meta = parameterMeta[paramKey];
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: "rgba(7,30,52,0.75)" }}
              onClick={onClose}
              data-ocid="parameter.modal"
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="bg-white rounded-2xl shadow-modal w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between bg-[#0B5C8F]">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-white/60 font-heading">
                      Parameter Report
                    </div>
                    <h2 className="text-xl font-black text-white font-heading mt-0.5">
                      DETAILED PARAMETER VIEW: {meta.label}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors flex-shrink-0 mt-1"
                    aria-label="Close modal"
                    data-ocid="parameter.close_button"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="overflow-y-auto flex-1 p-6 space-y-6">
                  <div className="bg-[#F4F6F8] rounded-xl p-4">
                    <h3 className="text-sm font-bold text-gray-700 font-heading mb-1">
                      About This Parameter
                    </h3>
                    <p className="text-sm text-gray-600">{meta.description}</p>
                    <p className="text-sm text-[#0B5C8F] mt-2 font-medium">
                      {meta.importance}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-700 font-heading mb-3">
                      Station Comparison
                    </h3>
                    <div className="space-y-4">
                      {stations.map((station) => {
                        const param = station.parameters[paramKey];
                        const score = scoreParameter(
                          param.value,
                          param.idealMin,
                          param.idealMax,
                        );
                        const grade = getGrade(score);
                        const trend = getTrend(param.trend);
                        return (
                          <div
                            key={station.id}
                            className="rounded-xl border border-gray-100 p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-7 h-7 rounded-md flex items-center justify-center text-white font-black text-xs font-heading"
                                  style={{ background: grade.color }}
                                >
                                  {grade.letter}
                                </div>
                                <span className="font-semibold text-gray-800">
                                  {station.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-xs">
                                  {trend === "up" && (
                                    <TrendingUp className="w-3 h-3 text-red-400" />
                                  )}
                                  {trend === "down" && (
                                    <TrendingDown className="w-3 h-3 text-green-500" />
                                  )}
                                  {trend === "stable" && (
                                    <Minus className="w-3 h-3 text-gray-400" />
                                  )}
                                </div>
                                <span
                                  className="text-lg font-black font-heading"
                                  style={{ color: grade.color }}
                                >
                                  {param.value}{" "}
                                  <span className="text-xs font-normal text-gray-400">
                                    {param.unit}
                                  </span>
                                </span>
                              </div>
                            </div>
                            <Sparkline
                              data={param.trend}
                              color={grade.color}
                              width={360}
                              height={56}
                            />
                            <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${score}%`,
                                  background: grade.color,
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-[#F4F6F8] rounded-xl p-4">
                    <h3 className="text-sm font-bold text-gray-700 font-heading mb-3">
                      Actionable Insights
                    </h3>
                    <ul className="space-y-2">
                      {meta.insights.map((ins) => (
                        <li
                          key={ins}
                          className="flex gap-2 text-sm text-gray-600"
                        >
                          <span className="text-[#0B5C8F] font-bold flex-shrink-0">
                            →
                          </span>
                          {ins}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
    </AnimatePresence>
  );
}
