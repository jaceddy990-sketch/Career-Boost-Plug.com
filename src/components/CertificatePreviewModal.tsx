import React from 'react';
import { X, Download, Printer } from 'lucide-react';

interface CertificatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  name: string;
  onDownloadPDF: () => void;
  onDownloadPNG: () => void;
}

export const CertificatePreviewModal: React.FC<CertificatePreviewModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  name,
  onDownloadPDF,
  onDownloadPNG,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Certificate Preview: {name || 'Attendee'}
            </h3>
            <p className="text-xs text-slate-500">
              BOOSTCON '26 – The 3rd Anniversary Conference
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/80 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Display */}
        <div className="p-4 sm:p-6 overflow-auto flex items-center justify-center bg-slate-100/70">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={`Certificate of Attendance for ${name || 'Attendee'}`}
              className="w-full max-h-[65vh] object-contain rounded-lg shadow-md border border-slate-200 bg-white"
            />
          ) : null}
        </div>

        {/* Modal Footer Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-t border-slate-200 bg-white">
          <p className="text-xs text-slate-500 hidden sm:block">
            Verified by Career Boost Plug • UI Ibadan, 2026
          </p>
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onDownloadPNG}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Image (PNG)</span>
            </button>
            <button
              type="button"
              onClick={onDownloadPDF}
              className="px-4 py-2 text-xs font-bold text-white bg-[#010545] hover:bg-[#07133b] rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#00B050]" />
              <span>DOWNLOAD CERTIFICATE (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
