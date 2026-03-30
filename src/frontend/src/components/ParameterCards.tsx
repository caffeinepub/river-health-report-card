import {
  Bug,
  Droplets,
  Eye,
  FlaskConical,
  Leaf,
  Thermometer,
  Waves,
  Worm,
} from "lucide-react";
import { motion } from "motion/react";
import {
  type ParameterKey,
  type Station,
  parameterMeta,
} from "../data/stations";
import {
  getGrade,
  getParameterAvg,
  getParameterAvgScore,
} from "../utils/scoring";

type Props = {
  stations: Station[];
  onViewDetails: (key: ParameterKey) => void;
};

const paramIcons: Record<
  ParameterKey,
  React.ComponentType<{ className?: string; color?: string }>
> = {
  dissolvedOxygen: Droplets,
  pH: FlaskConical,
  turbidity: Eye,
  temperature: Thermometer,
  nitrates: Leaf,
  ecoli: Bug,
  flowRate: Waves,
  macroinvertebrates: Worm,
};

export function ParameterCards({ stations, onViewDetails }: Props) {
  const paramKeys = Object.keys(parameterMeta) as ParameterKey[];

  return (
    <section id="parameters" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#0B5C8F] font-heading">
            Water Quality Metrics
          </span>
          <h2 className="text-3xl font-black text-gray-800 font-heading mt-2">
            Parameter Overview
          </h2>
          <p className="text-gray-500 mt-2 max-w-2xl">
            Average values and grades across all five monitoring stations for
            each key water quality parameter.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {paramKeys.map((key, idx) => {
            const avgScore = getParameterAvgScore(stations, key);
            const avgValue = getParameterAvg(stations, key);
            const grade = getGrade(avgScore);
            const meta = parameterMeta[key];
            const Icon = paramIcons[key];
            const sampleParam = stations[0].parameters[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="bg-[#F4F6F8] rounded-xl p-4 flex flex-col gap-3 hover:shadow-card transition-shadow"
                data-ocid={`parameter.card.${idx + 1}`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: `${grade.color}22` }}
                  >
                    <Icon className="w-5 h-5" color={grade.color} />
                  </div>
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-black text-lg font-heading"
                    style={{ background: grade.color }}
                  >
                    {grade.letter}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-800 font-heading leading-tight">
                    {meta.label}
                  </div>
                  <div className="text-2xl font-black text-gray-800 font-heading mt-1">
                    {avgValue}
                    <span className="text-sm font-normal text-gray-400 ml-1">
                      {sampleParam.unit}
                    </span>
                  </div>
                  <div className="text-xs" style={{ color: grade.color }}>
                    {grade.label} · {avgScore}/100
                  </div>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${avgScore}%`, background: grade.color }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onViewDetails(key)}
                  className="text-xs font-semibold text-[#0B5C8F] hover:underline text-left"
                  data-ocid={`parameter.view_details.${idx + 1}`}
                >
                  View Details →
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
