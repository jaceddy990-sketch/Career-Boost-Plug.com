import React from 'react';
import { Award, Sparkles } from 'lucide-react';

interface HeaderProps {
  onScrollToGenerator?: () => void;
  onOpenDetails?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToGenerator, onOpenDetails }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <a
            href="/"
            className="flex items-center gap-2.5 text-slate-900 hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#010545] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5 text-[#00B050]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-[#010545]">
                CAREER BOOST PLUG
              </span>
              <span className="text-[11px] font-medium text-slate-500 -mt-1 tracking-wider uppercase">
                BoostCon '26
              </span>
            </div>
          </a>

          {/* Zone 2: Clean single-line text nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={onScrollToGenerator}
              className="hover:text-[#010545] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Get Certificate
            </button>
            <button
              type="button"
              onClick={onOpenDetails}
              className="hover:text-[#010545] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Conference Details
            </button>
            <a
              href="#verification"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('verification')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#010545] transition-colors whitespace-nowrap shrink-0"
            >
              Verification
            </a>
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#010545] transition-colors whitespace-nowrap shrink-0"
            >
              Help & FAQ
            </a>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onScrollToGenerator}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#010545] hover:bg-[#08123b] active:scale-95 rounded-lg transition-all shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00B050]" />
              <span>Issue Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
