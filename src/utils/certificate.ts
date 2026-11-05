import { jsPDF } from 'jspdf';

export interface CertificateConfig {
  name: string;
  fontFamily?: string;
  color?: string;
  yOffset?: number;
}

export const CERTIFICATE_IMAGE_URL = '/assets/aistudio/Untitled_design__1___1__d6bfa406.png';
export const CERTIFICATE_WIDTH = 1536;
export const CERTIFICATE_HEIGHT = 1024;

// Precise coordinates identified from the certificate template
// "THIS IS TO CERTIFY THAT" baseline ends around y = 375
// Blue horizontal line sits at y = 495
// Baseline at y = 458 gives ~45px clearance under "THIS IS TO CERTIFY THAT"
// and ~17-20px above the blue line for Great Vibes cursive descenders.
export const NAME_CENTER_X = 768;
export const NAME_BASELINE_Y = 458;
export const MAX_NAME_WIDTH = 840; // Safe horizontal span above the blue line (325px to 1209px)
export const BASE_FONT_SIZE = 58; // Preferred 45–60px font size
export const MIN_FONT_SIZE = 30;

export const DEFAULT_FONT_FAMILY = "'Great Vibes', cursive";
export const DEFAULT_NAME_COLOR = '#142B50'; // Elegant dark navy blue

let cachedImage: HTMLImageElement | null = null;

/**
 * Preload the certificate template image
 */
export function preloadCertificateImage(): Promise<HTMLImageElement> {
  if (cachedImage && cachedImage.complete && cachedImage.naturalWidth > 0) {
    return Promise.resolve(cachedImage);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      cachedImage = img;
      resolve(img);
    };
    img.onerror = (err) => {
      console.error('Failed to load certificate template image', err);
      reject(new Error('Certificate image template failed to load.'));
    };
    img.src = CERTIFICATE_IMAGE_URL;
  });
}

/**
 * Format recipient's name for Great Vibes decorative script calligraphy.
 * Converts all-caps (e.g. "OGUNLEYE SAMSON") or all-lowercase ("ogunleye samson")
 * into Title Case ("Ogunleye Samson") to ensure flowing cursive ligatures and flourishes.
 */
export function formatName(name: string): string {
  if (!name) return '';
  const trimmed = name.trim();
  
  const isAllUpper = trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed);
  const isAllLower = trimmed === trimmed.toLowerCase() && /[a-z]/.test(trimmed);

  if (isAllUpper || isAllLower) {
    return trimmed
      .toLowerCase()
      .split(/\s+/)
      .map((word) => {
        if (!word) return '';
        if (word.startsWith("O'") && word.length > 2) {
          return "O'" + word.charAt(2).toUpperCase() + word.slice(3);
        }
        if (word.startsWith('(') && word.length > 1) {
          return '(' + word.charAt(1).toUpperCase() + word.slice(2);
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }

  return trimmed;
}

/**
 * Calculate optimal font size ensuring text fits within maxWidth
 */
export function calculateFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  fontFamily: string = DEFAULT_FONT_FAMILY,
  maxWidth: number = MAX_NAME_WIDTH,
  initialSize: number = BASE_FONT_SIZE,
  minSize: number = MIN_FONT_SIZE
): number {
  if (!text) return initialSize;
  
  let size = initialSize;
  ctx.font = `${size}px ${fontFamily}`;
  let width = ctx.measureText(text).width;

  if (width <= maxWidth) {
    return size;
  }

  // Calculate proportional size
  const scale = maxWidth / width;
  size = Math.floor(initialSize * scale);
  return Math.max(minSize, Math.min(initialSize, size));
}

/**
 * Draw the certificate onto a canvas element
 */
export async function renderCertificateToCanvas(
  canvas: HTMLCanvasElement,
  config: CertificateConfig
): Promise<void> {
  // Ensure Great Vibes font is fully loaded from Google Fonts before drawing
  if (typeof document !== 'undefined' && document.fonts) {
    try {
      await document.fonts.load('58px "Great Vibes"');
    } catch {
      // Font load fallback
    }
    await document.fonts.ready;
  }

  const img = await preloadCertificateImage();

  canvas.width = CERTIFICATE_WIDTH;
  canvas.height = CERTIFICATE_HEIGHT;

  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) throw new Error('Could not get 2D canvas context');

  // Draw background certificate image (exact original)
  ctx.drawImage(img, 0, 0, CERTIFICATE_WIDTH, CERTIFICATE_HEIGHT);

  // If name is provided, draw the participant's name using Great Vibes
  const formattedName = formatName(config.name);
  if (formattedName) {
    const fontFamily = config.fontFamily || DEFAULT_FONT_FAMILY;
    const fontSize = calculateFontSize(ctx, formattedName, fontFamily);
    const color = config.color || DEFAULT_NAME_COLOR;
    const yPos = NAME_BASELINE_Y + (config.yOffset || 0);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = color;
    ctx.font = `${fontSize}px ${fontFamily}`;

    ctx.fillText(formattedName, NAME_CENTER_X, yPos);
    ctx.restore();
  }
}

/**
 * Generate and download high-quality PDF
 */
export async function downloadCertificatePDF(
  canvas: HTMLCanvasElement,
  participantName: string
): Promise<void> {
  const formatted = formatName(participantName);
  const cleanName = (formatted || 'ATTENDEE').replace(/[^a-zA-Z0-9\s_-]/g, '').replace(/\s+/g, '_');
  const filename = `BOOSTCON26_Certificate_${cleanName}.pdf`;

  // Create landscape PDF with exact 1536x1024 aspect ratio (3:2)
  // We use [297, 198] mm for clean landscape printing
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [297, 198],
    compress: true,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.98);
  pdf.addImage(imgData, 'JPEG', 0, 0, 297, 198, undefined, 'FAST');
  pdf.save(filename);
}

/**
 * Download high-resolution PNG image
 */
export function downloadCertificatePNG(
  canvas: HTMLCanvasElement,
  participantName: string
): void {
  const formatted = formatName(participantName);
  const cleanName = (formatted || 'ATTENDEE').replace(/[^a-zA-Z0-9\s_-]/g, '').replace(/\s+/g, '_');
  const filename = `BOOSTCON26_Certificate_${cleanName}.png`;

  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
}
