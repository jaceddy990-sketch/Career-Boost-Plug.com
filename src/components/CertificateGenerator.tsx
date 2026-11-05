import React, { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Download,
  Printer,
  Maximize2,
  FileCheck,
  RefreshCw,
} from 'lucide-react';
import {
  renderCertificateToCanvas,
  downloadCertificatePDF,
  downloadCertificatePNG,
  formatName,
  CertificateConfig,
  CERTIFICATE_IMAGE_URL,
} from '../utils/certificate';
import { CertificatePreviewModal } from './CertificatePreviewModal';

const SAMPLE_NAMES = [
  'OGUNLEYE SAMSON',
  'Samson Adewale',
  'Dr. Christiana Adelusi',
  'Adaeze Okonkwo',
];

export const CertificateGenerator: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [generatedName, setGeneratedName] = useState<string>('');
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>(CERTIFICATE_IMAGE_URL);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const hiddenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  // Render certificate to canvas using Great Vibes decorative script font (#142B50)
  const updateCertificateRender = useCallback(async (nameToRender: string) => {
    if (!hiddenCanvasRef.current) return;
    try {
      setIsLoading(true);
      setErrorMessage('');
      const config: CertificateConfig = {
        name: nameToRender,
      };
      await renderCertificateToCanvas(hiddenCanvasRef.current, config);
      const dataUrl = hiddenCanvasRef.current.toDataURL('image/png', 0.98);
      setPreviewDataUrl(dataUrl);
    } catch (err) {
      console.error('Error rendering certificate:', err);
      setErrorMessage('Could not render certificate. Please refresh and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial render with empty template
  useEffect(() => {
    updateCertificateRender(generatedName);
  }, [updateCertificateRender, generatedName]);

  // Handle Generate Certificate
  const handleGenerateCertificate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = name.trim();
    if (!clean) {
      setErrorMessage('Please enter your full name to generate your certificate.');
      inputRef.current?.focus();
      return;
    }

    setErrorMessage('');
    setGeneratedName(clean);
    setIsGenerated(true);

    await updateCertificateRender(clean);

    // Celebratory confetti burst with conference colors
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#00B050', '#010545', '#E91E63', '#055DE3', '#F59E0B'],
        disableForReducedMotion: true,
      });
    } catch {
      // Safe fallback
    }

    // Smooth scroll to preview
    setTimeout(() => {
      previewRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }, 150);
  };

  // Handle PDF Download
  const handleDownloadPDF = async () => {
    if (!hiddenCanvasRef.current) return;
    const nameForPdf = generatedName || name || 'ATTENDEE';
    try {
      setIsPdfGenerating(true);
      await downloadCertificatePDF(hiddenCanvasRef.current, nameForPdf);
    } catch (err) {
      console.error('PDF download error:', err);
      setErrorMessage('Failed to generate PDF. Please try again.');
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // Handle PNG Download
  const handleDownloadPNG = () => {
    if (!hiddenCanvasRef.current) return;
    const nameForPng = generatedName || name || 'ATTENDEE';
    downloadCertificatePNG(hiddenCanvasRef.current, nameForPng);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      {/* Hidden off-screen canvas at exact native 1536x1024 resolution */}
      <canvas ref={hiddenCanvasRef} className="hidden" aria-hidden="true" />

      <div className="max-w-3xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-7">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-2">
            CAREER BOOST PLUG
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#010545]">
            BoostCon '26 Certificate
          </h1>
          <p className="mt-2 text-sm text-slate-500 font-normal">
            Enter your full name exactly as you want it to appear.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/70 p-6 sm:p-7 max-w-md w-full mx-auto transition-all">
          <form onSubmit={handleGenerateCertificate} className="space-y-4">
            <div>
              <label
                htmlFor="fullNameInput"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Full name
              </label>
              <input
                ref={inputRef}
                id="fullNameInput"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="e.g. OGUNLEYE SAMSON"
                maxLength={65}
                className="w-full px-3.5 py-2.5 text-sm sm:text-base rounded-lg border border-slate-300 focus:border-[#010545] focus:ring-2 focus:ring-[#010545]/15 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                autoComplete="name"
              />
            </div>

            {/* Quick Test Chips */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
              <span>Quick try:</span>
              {SAMPLE_NAMES.map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => {
                    setName(sample);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="text-slate-600 hover:text-[#010545] hover:underline transition-colors cursor-pointer"
                >
                  {sample}
                </button>
              ))}
            </div>

            {/* Error Feedback */}
            {errorMessage && (
              <p className="text-xs font-medium text-rose-600">
                {errorMessage}
              </p>
            )}

            {/* Generate Certificate Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#010545] hover:bg-[#07133b] active:scale-[0.99] disabled:opacity-50 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Generating Certificate...</span>
                </>
              ) : (
                <span>Generate Certificate</span>
              )}
            </button>
          </form>
        </div>

        {/* Privacy Note below card */}
        <p className="text-[11px] text-slate-400 text-center max-w-sm mx-auto mt-3.5 leading-relaxed">
          Privacy: your name is used only in your browser to create the certificate. Nothing is uploaded or stored.
        </p>

        {/* Certificate Preview and Download Area */}
        <div ref={previewRef} className="mt-10 sm:mt-12 transition-all">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200/80 overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/70">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#00B050]" />
                <span className="text-xs font-semibold text-slate-800">
                  {isGenerated
                    ? `Certificate for: ${formatName(generatedName)}`
                    : 'Certificate Preview (3:2 Landscape)'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Expand preview"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Zoom</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Print certificate"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print</span>
                </button>
              </div>
            </div>

            {/* Certificate Display in exact 3:2 Landscape aspect ratio */}
            <div className="p-3 sm:p-6 bg-slate-100/70 flex items-center justify-center">
              <div className="relative w-full max-w-3xl rounded-lg overflow-hidden shadow-md border border-slate-200/80 bg-white">
                {isLoading && !previewDataUrl ? (
                  <div className="aspect-[3/2] flex flex-col items-center justify-center bg-slate-50 text-slate-500 gap-2">
                    <RefreshCw className="w-7 h-7 animate-spin text-[#010545]" />
                    <p className="text-xs font-medium">Rendering certificate...</p>
                  </div>
                ) : previewDataUrl ? (
                  <img
                    src={previewDataUrl}
                    alt={
                      isGenerated
                        ? `Official BoostCon '26 Certificate of Attendance for ${formatName(generatedName)}`
                        : "BoostCon '26 Certificate Template"
                    }
                    className="w-full h-auto block select-none cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  />
                ) : null}
              </div>
            </div>

            {/* Download and Action Buttons */}
            <div className="p-5 sm:p-6 border-t border-slate-100 bg-white">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm font-bold text-slate-900">
                    {isGenerated
                      ? 'Certificate Generated Successfully!'
                      : 'Generate your certificate to download'}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Preserves original 3:2 landscape dimensions • Print-ready vector PDF
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 w-full sm:w-auto">
                  {/* Primary Download Button strictly as requested */}
                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    disabled={isPdfGenerating}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#010545] hover:bg-[#07133b] active:scale-[0.98] disabled:opacity-60 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#00B050]" />
                    <span>
                      {isPdfGenerating
                        ? 'CREATING PDF...'
                        : 'DOWNLOAD CERTIFICATE (PDF)'}
                    </span>
                  </button>

                  {/* Secondary PNG Download */}
                  <button
                    type="button"
                    onClick={handleDownloadPNG}
                    className="w-full sm:w-auto px-3.5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Save PNG</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal conference footer note */}
        <div className="text-center mt-10 text-xs text-slate-400">
          <p>
            BOOSTCON '26 – The 3rd Anniversary Conference • UI Hotels Hall, UI, Ibadan
          </p>
          <p className="mt-0.5">
            Career Boost Plug • Connecting Talents, Igniting Career.
          </p>
        </div>
      </div>

      {/* Fullscreen Inspection Modal */}
      <CertificatePreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={previewDataUrl}
        name={formatName(generatedName || name)}
        onDownloadPDF={handleDownloadPDF}
        onDownloadPNG={handleDownloadPNG}
      />
    </div>
  );
};
