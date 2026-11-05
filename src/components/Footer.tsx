import React from 'react';
import { Award, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00B050] flex items-center justify-center text-white font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-extrabold text-sm tracking-tight block">
                CAREER BOOST PLUG
              </span>
              <span className="text-xs text-slate-400">
                Connecting Talents, Igniting Career.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5 text-xs font-medium text-slate-300">
            <a
              href="https://linkedin.com/company/careerboostplug"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <a
              href="https://instagram.com/careerboostplug"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <a
              href="https://facebook.com/careerboostplug"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Facebook
            </a>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-400 font-mono">@careerboostplug</span>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Career Boost Plug. BOOSTCON '26 – The 3rd Anniversary Conference. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            UI Hotels Hall, University of Ibadan, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
};
