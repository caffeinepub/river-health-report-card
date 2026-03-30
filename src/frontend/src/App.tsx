import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useState } from "react";
import { Footer } from "./components/Footer";
import { GradeSummary } from "./components/GradeSummary";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { ParameterCards } from "./components/ParameterCards";
import { ParameterModal } from "./components/ParameterModal";
import { RiverMap } from "./components/RiverMap";
import { ScienceMethods } from "./components/ScienceMethods";
import { StationModal } from "./components/StationModal";
import { stations } from "./data/stations";
import type { ParameterKey, Station } from "./data/stations";

const queryClient = new QueryClient();

function AppContent() {
  const [activeStation, setActiveStation] = useState<Station | null>(null);
  const [stationModal, setStationModal] = useState<Station | null>(null);
  const [paramModal, setParamModal] = useState<ParameterKey | null>(null);

  const handleSelectStation = (station: Station) => {
    setActiveStation(station);
    setStationModal(station);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-body">
      <Navbar />
      <main>
        <Hero />

        {/* Explore Section */}
        <section id="explore" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#0B5C8F] font-heading">
                Interactive Map
              </span>
              <h2 className="text-3xl font-black text-gray-800 font-heading mt-2">
                Explore River Stations
              </h2>
              <p className="text-gray-500 mt-2">
                Click on a station marker to view detailed parameter data. Hover
                for a quick summary.
              </p>
            </div>

            {/* Station selector buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {stations.map((station, idx) => (
                <button
                  type="button"
                  key={station.id}
                  onClick={() => setActiveStation(station)}
                  className="px-4 py-2 rounded-full text-sm font-semibold border transition-all"
                  style={{
                    borderColor:
                      activeStation?.id === station.id ? "#0B5C8F" : "#e2e8f0",
                    background:
                      activeStation?.id === station.id ? "#0B5C8F" : "white",
                    color:
                      activeStation?.id === station.id ? "white" : "#374151",
                  }}
                  data-ocid={`explore.station_tab.${idx + 1}`}
                >
                  {station.name}
                </button>
              ))}
              {activeStation && (
                <button
                  type="button"
                  onClick={() => setStationModal(activeStation)}
                  className="px-4 py-2 rounded-full text-sm font-semibold bg-[#2FAE5B] text-white border-0 hover:bg-[#27954d] transition-colors"
                  data-ocid="explore.view_station_button"
                >
                  View {activeStation.name} Details →
                </button>
              )}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Map - takes 2 cols */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <RiverMap
                  stations={stations}
                  activeStation={activeStation}
                  onSelectStation={handleSelectStation}
                />
                <p className="text-xs text-gray-400 mt-2 text-center">
                  Click station markers to open detailed view. Color = health
                  grade.
                </p>
              </motion.div>

              {/* Grade summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <GradeSummary stations={stations} />
              </motion.div>
            </div>
          </div>
        </section>

        <ParameterCards
          stations={stations}
          onViewDetails={(key) => setParamModal(key)}
        />
        <ScienceMethods />
      </main>
      <Footer />

      {/* Modals */}
      <StationModal
        station={stationModal}
        onClose={() => setStationModal(null)}
      />
      <ParameterModal
        paramKey={paramModal}
        stations={stations}
        onClose={() => setParamModal(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
