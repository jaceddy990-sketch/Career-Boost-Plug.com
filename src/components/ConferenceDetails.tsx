import React from 'react';
import { Calendar, MapPin, Award, Users, Sparkles, CheckCircle2 } from 'lucide-react';

export const ConferenceDetails: React.FC = () => {
  return (
    <section id="details" className="py-12 bg-white border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <h2 className="text-xl sm:text-2xl font-black text-[#010545] tracking-tight">
            About BOOSTCON '26
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Career Boost Plug's flagship annual employability and career acceleration summit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Theme & Mission */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="w-10 h-10 rounded-xl bg-blue-100/70 flex items-center justify-center text-[#055DE3] mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              The Employability Advantage
            </h3>
            <p className="text-xs font-semibold text-[#E91E63] uppercase tracking-wider mb-2">
              Skills · Strategy · Success
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Equipping forward-thinking young professionals, graduates, and innovators with high-demand industry skills, strategic positioning, and career leverage.
            </p>
          </div>

          {/* Card 2: Date & Venue */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/70 flex items-center justify-center text-[#00B050] mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Event Date & Location
            </h3>
            <p className="text-xs font-semibold text-slate-700 mb-2">
              Saturday, 3rd October, 2026
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hosted at the prestigious <strong>UI Hotels Hall, University of Ibadan (UI), Ibadan</strong>. Celebrating the 3rd Anniversary of Career Boost Plug.
            </p>
          </div>

          {/* Card 3: Convener & Leadership */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="w-10 h-10 rounded-xl bg-indigo-100/70 flex items-center justify-center text-[#010545] mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Verified Convener
            </h3>
            <p className="text-xs font-semibold text-slate-700 mb-2">
              Christiana A. Adelusi
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Founder & Convener of Career Boost Plug. Official signatory on all certificates of attendance issued for BOOSTCON '26.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
