type Props = {
  data: number[];
  color: string;
  width?: number;
  height?: number;
  months?: string[];
};

export function Sparkline({
  data,
  color,
  width = 200,
  height = 60,
  months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
}: Props) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padX = 10;
  const padY = 8;
  const w = width - padX * 2;
  const h = height - padY * 2 - 14;

  const points = data.map((v, i) => {
    const x = padX + (i / (data.length - 1)) * w;
    const y = padY + (1 - (v - min) / range) * h;
    return { x, y, v, i };
  });

  const polylinePoints = points.map(({ x, y }) => `${x},${y}`).join(" ");

  const fillPoints = [
    `${points[0].x},${padY + h}`,
    ...points.map(({ x, y }) => `${x},${y}`),
    `${points[points.length - 1].x},${padY + h}`,
  ].join(" ");

  return (
    <svg
      width={width}
      height={height}
      className="overflow-visible"
      aria-hidden="true"
    >
      <title>Trend sparkline</title>
      <polygon points={fillPoints} fill={color} fillOpacity="0.12" />
      <polyline
        points={polylinePoints}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {points.map(({ x, y, v, i }) => (
        <circle
          key={`dot-${i}-${v}`}
          cx={x}
          cy={y}
          r="3"
          fill={color}
          stroke="white"
          strokeWidth="1.5"
        />
      ))}
      {months.map((m, i) => (
        <text
          key={`month-${m}`}
          x={padX + (i / (data.length - 1)) * w}
          y={height - 2}
          textAnchor="middle"
          fontSize="8"
          fill="#888"
          fontFamily="Open Sans, sans-serif"
        >
          {m}
        </text>
      ))}
    </svg>
  );
}
