import type {
  ParameterKey,
  Station,
  StationParameters,
} from "../data/stations";

export function scoreParameter(
  value: number,
  idealMin: number,
  idealMax: number,
): number {
  if (value >= idealMin && value <= idealMax) return 100;
  const range = idealMax - idealMin;
  if (value < idealMin) {
    const deficit = idealMin - value;
    const refRange = idealMin * 0.5 || range * 0.5 || 1;
    return Math.max(0, 100 - (deficit / refRange) * 100);
  }
  const excess = value - idealMax;
  const refRange = idealMax * 0.5 || range * 0.5 || 1;
  return Math.max(0, 100 - (excess / refRange) * 100);
}

export function getOverallScore(params: StationParameters): number {
  const keys = Object.keys(params) as ParameterKey[];
  let total = 0;
  for (const key of keys) {
    const p = params[key];
    const s = scoreParameter(p.value, p.idealMin, p.idealMax);
    total += s * (p.weight / 100);
  }
  return Math.round(total * 10) / 10;
}

export type Grade = { letter: string; color: string; label: string };

export function getGrade(score: number): Grade {
  if (score >= 90) return { letter: "A", color: "#2FAE5B", label: "Excellent" };
  if (score >= 75) return { letter: "B", color: "#8BCF7A", label: "Good" };
  if (score >= 60) return { letter: "C", color: "#F4C542", label: "Fair" };
  if (score >= 45) return { letter: "D", color: "#F28C28", label: "Poor" };
  return { letter: "F", color: "#D84B3E", label: "Critical" };
}

export function getStationScore(station: Station): number {
  return getOverallScore(station.parameters);
}

export function getRegionalScore(stations: Station[]): number {
  const avg =
    stations.reduce((sum, s) => sum + getStationScore(s), 0) / stations.length;
  return Math.round(avg * 10) / 10;
}

export function getParameterAvg(
  stations: Station[],
  key: ParameterKey,
): number {
  const sum = stations.reduce((acc, s) => acc + s.parameters[key].value, 0);
  return Math.round((sum / stations.length) * 10) / 10;
}

export function getParameterAvgScore(
  stations: Station[],
  key: ParameterKey,
): number {
  const scores = stations.map((s) => {
    const p = s.parameters[key];
    return scoreParameter(p.value, p.idealMin, p.idealMax);
  });
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.round(avg * 10) / 10;
}
