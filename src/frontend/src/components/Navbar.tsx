import { Waves } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-2"
          data-ocid="nav.link"
        >
          <div className="w-8 h-8 rounded-full bg-[#0B5C8F] flex items-center justify-center">
            <Waves className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-black text-xl text-[#0B5C8F] tracking-tight">
            RiverWatch
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#explore"
            className="text-sm font-medium text-gray-600 hover:text-[#0B5C8F] transition-colors"
            data-ocid="nav.explore_link"
          >
            Explore
          </a>
          <a
            href="#parameters"
            className="text-sm font-medium text-gray-600 hover:text-[#0B5C8F] transition-colors"
            data-ocid="nav.parameters_link"
          >
            Parameters
          </a>
          <a
            href="#methods"
            className="text-sm font-medium text-gray-600 hover:text-[#0B5C8F] transition-colors"
            data-ocid="nav.methods_link"
          >
            Methods
          </a>
        </nav>
        <a
          href="#explore"
          className="hidden md:inline-flex items-center px-4 py-2 rounded-md bg-[#0B5C8F] text-white text-sm font-semibold hover:bg-[#0a4f7a] transition-colors"
          data-ocid="nav.view_report_button"
        >
          View Full Report
        </a>
      </div>
    </header>
  );
}
