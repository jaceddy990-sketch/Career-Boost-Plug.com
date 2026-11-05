import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Shield, CheckCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'How do I download my certificate of attendance?',
    a: 'Simply type your full name in the name input field above and click "GENERATE CERTIFICATE". Review your preview, and then click "DOWNLOAD CERTIFICATE (PDF)". Your print-ready PDF will be saved to your device immediately.',
  },
  {
    q: 'Do I need to pay or create an account to get my certificate?',
    a: 'No. Access is 100% free and open for all BOOSTCON \'26 participants. There is no login, registration, payment, or admin approval required.',
  },
  {
    q: 'What if my name is long or has special characters?',
    a: 'Our smart certificate generator automatically adjusts the font size and character spacing to ensure any name fits naturally within the designated area without touching or overlapping existing conference details.',
  },
  {
    q: 'Can I generate and download more than once?',
    a: 'Yes, you can generate as many certificates as you need. If you mistyped your name or wish to test different capitalization styles, simply update the input and click Generate Certificate again.',
  },
  {
    q: 'How can I add this certificate to my LinkedIn profile?',
    a: 'Under your LinkedIn profile, navigate to the "Licenses & certifications" section. Enter "BOOSTCON \'26 – The 3rd Anniversary Conference" as the credential name and "Career Boost Plug" as the issuing organization.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4 text-[#00B050]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#010545] tracking-tight">
            Attendee Help & Verification
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Everything you need to know about your BOOSTCON '26 certificate.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200/80 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-[#010545] transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#010545]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Verification Note Box */}
        <div id="verification" className="mt-10 p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6 text-[#00B050]" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              Official Credential Authenticity
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Each certificate issued through this portal carries the authentic signature of Founder/Convener Christiana A. Adelusi and the official gold seal of Career Boost Plug.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
