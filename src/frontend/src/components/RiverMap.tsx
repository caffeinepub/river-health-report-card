import { useState } from "react";
import type { Station } from "../data/stations";
import { getGrade, getStationScore } from "../utils/scoring";

type Props = {
  stations: Station[];
  activeStation: Station | null;
  onSelectStation: (station: Station) => void;
};

type TooltipState = {
  station: Station;
  x: number;
  y: number;
} | null;

export function RiverMap({ stations, activeStation, onSelectStation }: Props) {
  const [tooltip, setTooltip] = useState<TooltipState>(null);

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-card border border-gray-200 bg-gradient-to-br from-[#e8f4f8] to-[#d0eaf5]">
      <svg
        viewBox="0 0 750 420"
        className="w-full h-auto"
        style={{ display: "block" }}
        aria-label="Interactive river health map with 5 monitoring stations"
      >
        <title>River Health Monitoring Map</title>
        <defs>
          <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4BA3C7" />
            <stop offset="100%" stopColor="#2FAE5B" stopOpacity="0.7" />
          </linearGradient>
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
        </defs>

        <rect x="0" y="0" width="750" height="420" fill="#daeef7" />

        {stations.map((station) => {
          const score = getStationScore(station);
          const grade = getGrade(score);
          const ws = watershedPolygons[station.id];
          if (!ws) return null;
          return (
            <polygon
              key={`${station.id}-ws`}
              points={ws}
              fill={grade.color}
              fillOpacity="0.13"
              stroke={grade.color}
              strokeOpacity="0.2"
              strokeWidth="1"
            />
          );
        })}

        <g opacity="0.6">
          <polygon points="30,120 70,50 110,120" fill="#7da5b8" />
          <polygon points="55,120 90,60 130,120" fill="#8fb5c5" />
          <polygon points="80,120 110,75 145,120" fill="#a0c0d0" />
          <polygon points="70,50 60,70 80,70" fill="white" fillOpacity="0.7" />
          <polygon points="90,60 82,78 98,78" fill="white" fillOpacity="0.6" />
        </g>

        {[290, 320, 370, 400, 430].map((x) => (
          <g
            key={x}
            transform={`translate(${x}, ${160 + (x % 30)})`}
            opacity="0.5"
          >
            <polygon points="0,-18 -10,0 10,0" fill="#3a7a3a" />
            <rect x="-2" y="0" width="4" height="6" fill="#5a3a20" />
          </g>
        ))}

        <ellipse
          cx="695"
          cy="375"
          rx="65"
          ry="40"
          fill="#1a6fa8"
          fillOpacity="0.25"
        />
        <ellipse
          cx="695"
          cy="385"
          rx="55"
          ry="30"
          fill="#1a6fa8"
          fillOpacity="0.20"
        />
        <text
          x="665"
          y="410"
          fontSize="10"
          fill="#1a6fa8"
          fillOpacity="0.7"
          fontFamily="Open Sans, sans-serif"
        >
          Ocean
        </text>

        <path
          d="M 80,50 C 120,60 170,90 220,130 C 270,170 300,190 350,210 C 400,230 440,250 500,290 C 550,320 580,340 620,350 C 650,358 670,368 690,378"
          fill="none"
          stroke="url(#riverGrad)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
        <path
          d="M 80,50 C 120,60 170,90 220,130 C 270,170 300,190 350,210 C 400,230 440,250 500,290 C 550,320 580,340 620,350 C 650,358 670,368 690,378"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.25"
          strokeDasharray="8 12"
        />

        {stations.map((station, idx) => {
          const score = getStationScore(station);
          const grade = getGrade(score);
          const isActive = activeStation?.id === station.id;
          return (
            <g
              key={station.id}
              style={{ cursor: "pointer" }}
              tabIndex={0}
              aria-label={`${station.name} station, grade ${grade.letter}`}
              onClick={() => onSelectStation(station)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  onSelectStation(station);
              }}
              onMouseEnter={() =>
                setTooltip({ station, x: station.svgX, y: station.svgY })
              }
              onMouseLeave={() => setTooltip(null)}
              data-ocid={`map.station.${idx + 1}`}
            >
              {isActive && (
                <circle
                  cx={station.svgX}
                  cy={station.svgY}
                  r="22"
                  fill={grade.color}
                  fillOpacity="0.25"
                  stroke={grade.color}
                  strokeWidth="2"
                />
              )}
              <circle
                cx={station.svgX + 1}
                cy={station.svgY + 2}
                r="14"
                fill="rgba(0,0,0,0.2)"
              />
              <circle
                cx={station.svgX}
                cy={station.svgY}
                r="14"
                fill={grade.color}
                stroke="white"
                strokeWidth="3"
                filter="url(#shadow)"
              />
              <text
                x={station.svgX}
                y={station.svgY + 5}
                textAnchor="middle"
                fontSize="13"
                fontWeight="bold"
                fill="white"
                fontFamily="Montserrat, sans-serif"
              >
                {grade.letter}
              </text>
              <text
                x={station.svgX}
                y={station.svgY + 30}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="#1a3a4a"
                fontFamily="Open Sans, sans-serif"
              >
                {station.name}
              </text>
            </g>
          );
        })}

        {tooltip &&
          (() => {
            const score = getStationScore(tooltip.station);
            const grade = getGrade(score);
            const tx = Math.min(tooltip.x + 20, 620);
            const ty = Math.max(tooltip.y - 60, 10);
            return (
              <g>
                <rect
                  x={tx}
                  y={ty}
                  width="130"
                  height="52"
                  rx="6"
                  fill="white"
                  stroke={grade.color}
                  strokeWidth="2"
                  filter="url(#shadow)"
                />
                <text
                  x={tx + 10}
                  y={ty + 18}
                  fontSize="11"
                  fontWeight="700"
                  fill="#1a3a4a"
                  fontFamily="Montserrat, sans-serif"
                >
                  {tooltip.station.name}
                </text>
                <text
                  x={tx + 10}
                  y={ty + 34}
                  fontSize="10"
                  fill="#555"
                  fontFamily="Open Sans, sans-serif"
                >
                  Score: {score}
                </text>
                <text
                  x={tx + 100}
                  y={ty + 34}
                  fontSize="16"
                  fontWeight="900"
                  fill={grade.color}
                  fontFamily="Montserrat, sans-serif"
                >
                  {grade.letter}
                </text>
                <text
                  x={tx + 10}
                  y={ty + 46}
                  fontSize="9"
                  fill="#888"
                  fontFamily="Open Sans, sans-serif"
                >
                  {grade.label}
                </text>
              </g>
            );
          })()}

        <g transform="translate(710, 30)">
          <circle
            cx="0"
            cy="0"
            r="16"
            fill="white"
            fillOpacity="0.8"
            stroke="#ccc"
            strokeWidth="1"
          />
          <text
            x="0"
            y="-6"
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill="#333"
          >
            N
          </text>
          <line x1="0" y1="-12" x2="0" y2="12" stroke="#666" strokeWidth="1" />
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#666" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}

const watershedPolygons: Record<string, string> = {
  headwaters: "0,0 200,0 180,160 50,160",
  "upper-reach": "180,0 340,0 320,200 160,200",
  "mid-reach": "300,100 450,80 460,280 290,280",
  "lower-reach": "420,150 600,120 620,320 400,330",
  estuary: "570,200 750,180 750,420 550,420",
};
