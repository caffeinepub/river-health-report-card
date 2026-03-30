import { Github, Mail, Twitter, Waves } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-[#071e34] text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#0B5C8F] flex items-center justify-center">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-black text-xl">
                RiverWatch
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Annual river health monitoring and reporting for watershed
              protection and aquatic ecosystem conservation.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@riverwatch.org"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4 font-heading">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a
                  href="#explore"
                  className="hover:text-white transition-colors"
                >
                  River Map
                </a>
              </li>
              <li>
                <a
                  href="#parameters"
                  className="hover:text-white transition-colors"
                >
                  Parameters
                </a>
              </li>
              <li>
                <a
                  href="#methods"
                  className="hover:text-white transition-colors"
                >
                  Methods
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4 font-heading">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a
                  href="https://www.epa.gov/waterdata"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  EPA Guidelines
                </a>
              </li>
              <li>
                <a
                  href="https://waterdata.usgs.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Data Downloads
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@riverwatch.org"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© {year} RiverWatch. All rights reserved.</span>
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/70 transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
