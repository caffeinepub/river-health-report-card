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
  station: Station | null;
  onClose: () => void;
};

export function StationModal({ station, onClose }: Props) {
  useEffect(() => {
    if (station) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [station, onClose]);

  useEffect(() => {
    if (station) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [station]);

  const paramKeys = Object.keys(parameterMeta) as ParameterKey[];

  const getTrend = (trend: number[]) => {
    const first = trend[0];
    const last = trend[trend.length - 1];
    if (last > first * 1.02) return "up";
    if (last < first * 0.98) return "down";
    return "stable";
  };

  return (
    <AnimatePresence>
      {station && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(7,30,52,0.75)" }}
          onClick={onClose}
          data-ocid="station.modal"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="bg-white rounded-2xl shadow-modal w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between bg-[#0B5C8F]">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-white/60 font-heading">
                  Station Report
                </div>
                <h2 className="text-xl font-black text-white font-heading mt-0.5">
                  DETAILED PARAMETER VIEW: {station.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors flex-shrink-0 mt-1"
                aria-label="Close modal"
                data-ocid="station.close_button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paramKeys.map((key) => {
                  const param = station.parameters[key];
                  const score = scoreParameter(
                    param.value,
                    param.idealMin,
                    param.idealMax,
                  );
                  const grade = getGrade(score);
                  const meta = parameterMeta[key];
                  const trend = getTrend(param.trend);
                  return (
                    <div
                      key={key}
                      className="rounded-xl border border-gray-100 p-4 bg-[#F4F6F8] flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-800 font-heading">
                          {meta.label}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {score.toFixed(0)}/100
                          </span>
                          <div
                            className="w-8 h-8 rounded-md flex items-center justify-center text-white font-black font-heading text-sm"
                            style={{ background: grade.color }}
                          >
                            {grade.letter}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-2xl font-black text-gray-800 font-heading">
                            {param.value}
                          </span>
                          <span className="text-sm text-gray-400 ml-1">
                            {param.unit}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          {trend === "up" && (
                            <TrendingUp className="w-4 h-4 text-red-400" />
                          )}
                          {trend === "down" && (
                            <TrendingDown className="w-4 h-4 text-green-500" />
                          )}
                          {trend === "stable" && (
                            <Minus className="w-4 h-4 text-gray-400" />
                          )}
                          <span
                            className={
                              trend === "up"
                                ? "text-red-400"
                                : trend === "down"
                                  ? "text-green-500"
                                  : "text-gray-400"
                            }
                          >
                            {trend}
                          </span>
                        </div>
                      </div>

                      <Sparkline
                        data={param.trend}
                        color={grade.color}
                        width={220}
                        height={64}
                      />

                      <div className="h-1.5 bg-white rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${score}%`,
                            background: grade.color,
                          }}
                        />
                      </div>

                      <p className="text-xs text-gray-500 leading-relaxed">
                        {meta.description}
                      </p>

                      <div>
                        <div className="text-xs font-semibold text-gray-700 mb-1">
                          Key Insights
                        </div>
                        <ul className="space-y-1">
                          {meta.insights.map((ins) => (
                            <li
                              key={ins}
                              className="text-xs text-gray-500 flex gap-1.5"
                            >
                              <span
                                style={{ color: grade.color }}
                                className="flex-shrink-0 mt-0.5"
                              >
                                •
                              </span>
                              {ins}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
