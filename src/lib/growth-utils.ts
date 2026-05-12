/**
 * WHO Growth Standard Z-Score Calculation (LMS Method)
 * Z = [((Value/M)^L) - 1] / (L * S)
 */

export interface LMSData {
  l: number;
  m: number;
  s: number;
  [key: string]: number;
}

/**
 * Calculates the Z-score for a given value using LMS parameters.
 */
export function calculateZScore(value: number, lms: LMSData): number {
  const { l, m, s } = lms;
  
  // Handling extremely low values (e.g. 0) to avoid math errors
  const val = Math.max(value, 0.0001);
  
  let z = 0;
  try {
    if (Math.abs(l) < 0.0001) {
      z = Math.log(val / m) / s;
    } else {
      z = (Math.pow(val / m, l) - 1) / (l * s);
    }

    /**
     * WHO adjustment for Z-scores > 3 or < -3
     * This is part of the WHO Child Growth Standards to avoid stretching the tails
     */
    if (z > 3) {
      const sd3pos = m * Math.pow(1 + l * s * 3, 1 / l);
      const sd2pos = m * Math.pow(1 + l * s * 2, 1 / l);
      const sdDiff = sd3pos - sd2pos;
      return 3 + (val - sd3pos) / sdDiff;
    } else if (z < -3) {
      const sd3neg = m * Math.pow(1 + l * s * (-3), 1 / l);
      const sd2neg = m * Math.pow(1 + l * s * (-2), 1 / l);
      const sdDiff = sd2neg - sd3neg;
      return -3 + (val - sd3neg) / sdDiff;
    }
  } catch (e) {
    // If the math results in NaN or complex numbers, return the basic z
    console.error("Z-Score adjustment error", e);
  }

  return z;
}

/**
 * Linear interpolation between two data points.
 */
export function interpolateLMS(x: number, x1: number, x2: number, lms1: LMSData, lms2: LMSData): LMSData {
  const factor = (x - x1) / (x2 - x1);
  return {
    l: lms1.l + (lms2.l - lms1.l) * factor,
    m: lms1.m + (lms2.m - lms1.m) * factor,
    s: lms1.s + (lms2.s - lms1.s) * factor,
  };
}

/**
 * Finds the appropriate LMS parameters for a given age or height.
 */
export function findLMS(value: number, dataset: LMSData[], key: string): LMSData {
  if (!dataset || dataset.length === 0) {
    throw new Error(`Dataset for ${key} is empty or undefined`);
  }

  // Exact match
  const exact = dataset.find((d) => d[key] === value);
  if (exact) return exact;

  // Find boundaries for interpolation
  const sorted = [...dataset].sort((a, b) => a[key] - b[key]);
  const index = sorted.findIndex((d) => d[key] > value);

  if (index === 0) return sorted[0];
  if (index === -1) return sorted[sorted.length - 1];

  const d1 = sorted[index - 1];
  const d2 = sorted[index];

  return interpolateLMS(value, d1[key], d2[key], d1, d2);
}

/**
 * Nutritional Status Classifications (Kemenkes 2020)
 * 
 * BB/U (Weight-for-Age):
 * < -3 SD: Berat badan sangat kurang (Severely Underweight)
 * -3 SD sd < -2 SD: Berat badan kurang (Underweight)
 * -2 SD sd +1 SD: Berat badan normal
 * > +1 SD: Risiko Berat badan lebih
 * 
 * TB/U (Height-for-Age):
 * < -3 SD: Sangat pendek (Severely Stunted)
 * -3 SD sd < -2 SD: Pendek (Stunted)
 * -2 SD sd +3 SD: Normal
 * > +3 SD: Tinggi
 * 
 * BB/TB (Weight-for-Height):
 * < -3 SD: Gizi buruk (Severely Wasted)
 * -3 SD sd < -2 SD: Gizi kurang (Wasted)
 * -2 SD sd +1 SD: Gizi baik (Normal)
 * > +1 SD sd +2 SD: Berisiko gizi lebih (At risk of overweight)
 * > +2 SD sd +3 SD: Gizi lebih (Overweight)
 * > +3 SD: Obesitas (Obese)
 */

export function getStatusWFA(zScore: number): string {
  if (zScore < -3) return "Berat badan sangat kurang (Severely Underweight)";
  if (zScore < -2) return "Berat badan kurang (Underweight)";
  if (zScore <= 1) return "Berat badan normal";
  return "Risiko berat badan lebih";
}

export function getStatusHFA(zScore: number): string {
  if (zScore < -3) return "Sangat pendek (Severely Stunted)";
  if (zScore < -2) return "Pendek (Stunted)";
  if (zScore <= 3) return "Normal";
  return "Tinggi";
}

export function getStatusWFH(zScore: number): string {
  if (zScore < -3) return "Gizi buruk (Severely Wasted)";
  if (zScore < -2) return "Gizi kurang (Wasted)";
  if (zScore <= 1) return "Gizi baik (Normal)";
  if (zScore <= 2) return "Berisiko gizi lebih (At risk of overweight)";
  if (zScore <= 3) return "Gizi lebih (Overweight)";
  return "Obesitas (Obese)";
}
