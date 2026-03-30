export type ParameterData = {
  value: number;
  unit: string;
  idealMin: number;
  idealMax: number;
  weight: number;
  trend: number[];
};

export type StationParameters = {
  dissolvedOxygen: ParameterData;
  pH: ParameterData;
  turbidity: ParameterData;
  temperature: ParameterData;
  nitrates: ParameterData;
  ecoli: ParameterData;
  flowRate: ParameterData;
  macroinvertebrates: ParameterData;
};

export type Station = {
  id: string;
  name: string;
  svgX: number;
  svgY: number;
  parameters: StationParameters;
};

export const stations: Station[] = [
  {
    id: "headwaters",
    name: "Headwaters",
    svgX: 120,
    svgY: 60,
    parameters: {
      dissolvedOxygen: {
        value: 9.2,
        unit: "mg/L",
        idealMin: 7,
        idealMax: 12,
        weight: 20,
        trend: [8.8, 9.0, 9.1, 9.3, 9.2, 9.2],
      },
      pH: {
        value: 7.4,
        unit: "pH",
        idealMin: 6.5,
        idealMax: 8.5,
        weight: 15,
        trend: [7.2, 7.3, 7.4, 7.4, 7.5, 7.4],
      },
      turbidity: {
        value: 3.1,
        unit: "NTU",
        idealMin: 0,
        idealMax: 5,
        weight: 15,
        trend: [4.0, 3.5, 3.2, 3.0, 3.1, 3.1],
      },
      temperature: {
        value: 14.2,
        unit: "°C",
        idealMin: 10,
        idealMax: 18,
        weight: 10,
        trend: [11.0, 12.5, 14.0, 15.2, 14.8, 14.2],
      },
      nitrates: {
        value: 2.1,
        unit: "mg/L",
        idealMin: 0,
        idealMax: 5,
        weight: 15,
        trend: [2.5, 2.3, 2.2, 2.0, 2.1, 2.1],
      },
      ecoli: {
        value: 45,
        unit: "CFU/100mL",
        idealMin: 0,
        idealMax: 100,
        weight: 15,
        trend: [60, 55, 50, 48, 45, 45],
      },
      flowRate: {
        value: 12.5,
        unit: "m³/s",
        idealMin: 8,
        idealMax: 20,
        weight: 5,
        trend: [10.0, 11.0, 12.0, 12.8, 12.5, 12.5],
      },
      macroinvertebrates: {
        value: 78,
        unit: "index",
        idealMin: 60,
        idealMax: 100,
        weight: 5,
        trend: [72, 74, 75, 77, 78, 78],
      },
    },
  },
  {
    id: "upper-reach",
    name: "Upper Reach",
    svgX: 220,
    svgY: 130,
    parameters: {
      dissolvedOxygen: {
        value: 8.1,
        unit: "mg/L",
        idealMin: 7,
        idealMax: 12,
        weight: 20,
        trend: [8.5, 8.3, 8.2, 8.0, 8.1, 8.1],
      },
      pH: {
        value: 7.8,
        unit: "pH",
        idealMin: 6.5,
        idealMax: 8.5,
        weight: 15,
        trend: [7.5, 7.6, 7.7, 7.8, 7.9, 7.8],
      },
      turbidity: {
        value: 8.5,
        unit: "NTU",
        idealMin: 0,
        idealMax: 5,
        weight: 15,
        trend: [6.0, 7.0, 8.0, 8.5, 8.8, 8.5],
      },
      temperature: {
        value: 17.1,
        unit: "°C",
        idealMin: 10,
        idealMax: 18,
        weight: 10,
        trend: [13.0, 14.5, 16.0, 17.5, 17.1, 17.1],
      },
      nitrates: {
        value: 5.8,
        unit: "mg/L",
        idealMin: 0,
        idealMax: 5,
        weight: 15,
        trend: [4.0, 4.5, 5.0, 5.5, 5.8, 5.8],
      },
      ecoli: {
        value: 185,
        unit: "CFU/100mL",
        idealMin: 0,
        idealMax: 100,
        weight: 15,
        trend: [100, 120, 150, 175, 185, 185],
      },
      flowRate: {
        value: 18.3,
        unit: "m³/s",
        idealMin: 8,
        idealMax: 20,
        weight: 5,
        trend: [15.0, 16.0, 17.0, 18.0, 18.3, 18.3],
      },
      macroinvertebrates: {
        value: 62,
        unit: "index",
        idealMin: 60,
        idealMax: 100,
        weight: 5,
        trend: [68, 66, 65, 63, 62, 62],
      },
    },
  },
  {
    id: "mid-reach",
    name: "Mid Reach",
    svgX: 350,
    svgY: 210,
    parameters: {
      dissolvedOxygen: {
        value: 6.5,
        unit: "mg/L",
        idealMin: 7,
        idealMax: 12,
        weight: 20,
        trend: [7.2, 7.0, 6.8, 6.6, 6.5, 6.5],
      },
      pH: {
        value: 8.1,
        unit: "pH",
        idealMin: 6.5,
        idealMax: 8.5,
        weight: 15,
        trend: [7.8, 7.9, 8.0, 8.1, 8.2, 8.1],
      },
      turbidity: {
        value: 18.2,
        unit: "NTU",
        idealMin: 0,
        idealMax: 5,
        weight: 15,
        trend: [12.0, 14.0, 16.0, 17.5, 18.2, 18.2],
      },
      temperature: {
        value: 21.5,
        unit: "°C",
        idealMin: 10,
        idealMax: 18,
        weight: 10,
        trend: [16.0, 18.0, 20.0, 21.0, 21.5, 21.5],
      },
      nitrates: {
        value: 9.2,
        unit: "mg/L",
        idealMin: 0,
        idealMax: 5,
        weight: 15,
        trend: [6.0, 7.0, 8.0, 8.8, 9.2, 9.2],
      },
      ecoli: {
        value: 380,
        unit: "CFU/100mL",
        idealMin: 0,
        idealMax: 100,
        weight: 15,
        trend: [200, 250, 300, 350, 380, 380],
      },
      flowRate: {
        value: 28.7,
        unit: "m³/s",
        idealMin: 8,
        idealMax: 20,
        weight: 5,
        trend: [22.0, 24.0, 26.0, 27.5, 28.7, 28.7],
      },
      macroinvertebrates: {
        value: 48,
        unit: "index",
        idealMin: 60,
        idealMax: 100,
        weight: 5,
        trend: [58, 55, 53, 50, 48, 48],
      },
    },
  },
  {
    id: "lower-reach",
    name: "Lower Reach",
    svgX: 500,
    svgY: 290,
    parameters: {
      dissolvedOxygen: {
        value: 5.2,
        unit: "mg/L",
        idealMin: 7,
        idealMax: 12,
        weight: 20,
        trend: [6.5, 6.2, 5.8, 5.5, 5.2, 5.2],
      },
      pH: {
        value: 8.6,
        unit: "pH",
        idealMin: 6.5,
        idealMax: 8.5,
        weight: 15,
        trend: [8.2, 8.3, 8.4, 8.5, 8.6, 8.6],
      },
      turbidity: {
        value: 32.0,
        unit: "NTU",
        idealMin: 0,
        idealMax: 5,
        weight: 15,
        trend: [20.0, 24.0, 28.0, 30.0, 32.0, 32.0],
      },
      temperature: {
        value: 24.8,
        unit: "°C",
        idealMin: 10,
        idealMax: 18,
        weight: 10,
        trend: [18.0, 20.0, 22.5, 24.0, 24.8, 24.8],
      },
      nitrates: {
        value: 14.5,
        unit: "mg/L",
        idealMin: 0,
        idealMax: 5,
        weight: 15,
        trend: [8.0, 10.0, 12.0, 13.5, 14.5, 14.5],
      },
      ecoli: {
        value: 620,
        unit: "CFU/100mL",
        idealMin: 0,
        idealMax: 100,
        weight: 15,
        trend: [350, 420, 500, 580, 620, 620],
      },
      flowRate: {
        value: 42.1,
        unit: "m³/s",
        idealMin: 8,
        idealMax: 20,
        weight: 5,
        trend: [32.0, 35.0, 38.0, 40.0, 42.1, 42.1],
      },
      macroinvertebrates: {
        value: 31,
        unit: "index",
        idealMin: 60,
        idealMax: 100,
        weight: 5,
        trend: [45, 42, 38, 34, 31, 31],
      },
    },
  },
  {
    id: "estuary",
    name: "Estuary",
    svgX: 620,
    svgY: 350,
    parameters: {
      dissolvedOxygen: {
        value: 4.8,
        unit: "mg/L",
        idealMin: 7,
        idealMax: 12,
        weight: 20,
        trend: [6.0, 5.8, 5.5, 5.0, 4.8, 4.8],
      },
      pH: {
        value: 8.9,
        unit: "pH",
        idealMin: 6.5,
        idealMax: 8.5,
        weight: 15,
        trend: [8.4, 8.5, 8.7, 8.8, 8.9, 8.9],
      },
      turbidity: {
        value: 45.0,
        unit: "NTU",
        idealMin: 0,
        idealMax: 5,
        weight: 15,
        trend: [28.0, 33.0, 38.0, 42.0, 45.0, 45.0],
      },
      temperature: {
        value: 27.3,
        unit: "°C",
        idealMin: 10,
        idealMax: 18,
        weight: 10,
        trend: [20.0, 22.0, 25.0, 26.5, 27.3, 27.3],
      },
      nitrates: {
        value: 18.8,
        unit: "mg/L",
        idealMin: 0,
        idealMax: 5,
        weight: 15,
        trend: [10.0, 13.0, 15.5, 17.0, 18.8, 18.8],
      },
      ecoli: {
        value: 850,
        unit: "CFU/100mL",
        idealMin: 0,
        idealMax: 100,
        weight: 15,
        trend: [500, 600, 700, 780, 850, 850],
      },
      flowRate: {
        value: 65.0,
        unit: "m³/s",
        idealMin: 8,
        idealMax: 20,
        weight: 5,
        trend: [50.0, 55.0, 58.0, 62.0, 65.0, 65.0],
      },
      macroinvertebrates: {
        value: 22,
        unit: "index",
        idealMin: 60,
        idealMax: 100,
        weight: 5,
        trend: [35, 30, 27, 24, 22, 22],
      },
    },
  },
];

export type ParameterKey = keyof StationParameters;

export const parameterMeta: Record<
  ParameterKey,
  { label: string; description: string; importance: string; insights: string[] }
> = {
  dissolvedOxygen: {
    label: "Dissolved Oxygen",
    description:
      "Amount of oxygen dissolved in water, essential for aquatic life.",
    importance:
      "Critical for fish survival and aerobic decomposition processes.",
    insights: [
      "Values below 5 mg/L stress most fish",
      "Low levels often indicate organic pollution",
      "Seasonal temperature affects oxygen solubility",
    ],
  },
  pH: {
    label: "pH Levels",
    description: "Measure of acidity or alkalinity on a 0-14 scale.",
    importance:
      "Affects nutrient availability and toxicity of pollutants to aquatic organisms.",
    insights: [
      "Most aquatic life thrives between pH 6.5-8.5",
      "Acid rain can lower river pH significantly",
      "Algae blooms can raise pH above 9",
    ],
  },
  turbidity: {
    label: "Turbidity",
    description: "Cloudiness of water caused by suspended particles.",
    importance:
      "High turbidity reduces light penetration, harming aquatic plants and visual predators.",
    insights: [
      "Values above 25 NTU indicate significant sediment loading",
      "Linked to erosion and land-use changes",
      "Affects photosynthesis in aquatic plants",
    ],
  },
  temperature: {
    label: "Temperature",
    description: "Water temperature in degrees Celsius.",
    importance:
      "Controls metabolic rates, oxygen solubility, and species distribution.",
    insights: [
      "Each 10°C rise roughly doubles metabolic rate",
      "High temps can cause fish kills when combined with low O2",
      "Climate change is increasing baseline river temperatures",
    ],
  },
  nitrates: {
    label: "Nitrate Levels",
    description:
      "Concentration of nitrate ions, a key nutrient that causes eutrophication.",
    importance:
      "Excess nitrates drive algal blooms that deplete oxygen and kill aquatic life.",
    insights: [
      "Agriculture is the primary source of nitrate pollution",
      "Above 10 mg/L is concerning for drinking water",
      "Riparian buffers help filter nitrates",
    ],
  },
  ecoli: {
    label: "E. coli",
    description: "Fecal indicator bacteria count per 100 mL of water.",
    importance:
      "Indicates fecal contamination and presence of pathogens dangerous to human health.",
    insights: [
      "Above 235 CFU/100mL: unsafe for swimming (EPA)",
      "Sources: sewage overflows, livestock runoff",
      "Levels fluctuate significantly after rainfall",
    ],
  },
  flowRate: {
    label: "Flow Rate",
    description: "Volume of water passing a point per second.",
    importance:
      "Affects habitat, dilution of pollutants, and sediment transport.",
    insights: [
      "Extreme high/low flows both stress ecosystems",
      "Dams and diversions alter natural flow regimes",
      "Flow rate is tied to seasonal precipitation patterns",
    ],
  },
  macroinvertebrates: {
    label: "Macroinvertebrates",
    description:
      "Biological index based on diversity and abundance of invertebrates.",
    importance:
      "Bioindicators that integrate water quality over time better than single samples.",
    insights: [
      "Score above 70 indicates good ecological health",
      "Sensitive species (stoneflies, mayflies) disappear first",
      "Index reflects cumulative pollution history",
    ],
  },
};
