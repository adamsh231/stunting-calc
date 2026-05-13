/**
 * Kemenkes RI / WHO Growth Standard Z-Score Calculation
 * Formula based on Permenkes No. 2 Tahun 2020
 */

export interface GrowthData {
  median: number;
  sd1pos: number;
  sd1neg: number;
  sd2pos: number;
  sd2neg: number;
  sd3pos: number;
  sd3neg: number;
  [key: string]: number;
}

/**
 * Calculates the Z-score using the Standard Deviation method.
 * If Value > Median: Z = (Value - Median) / (SD1pos - Median)
 * If Value < Median: Z = (Value - Median) / (Median - SD1neg)
 */
export function calculateZScore(value: number, data: GrowthData): number {
  const { median, sd1pos, sd1neg } = data;
  
  if (value === median) return 0;
  
  if (value > median) {
    return (value - median) / (sd1pos - median);
  } else {
    return (value - median) / (median - sd1neg);
  }
}

/**
 * Linear interpolation between two data points.
 */
export function interpolateGrowthData(x: number, x1: number, x2: number, d1: GrowthData, d2: GrowthData): GrowthData {
  const factor = (x - x1) / (x2 - x1);
  return {
    median: d1.median + (d2.median - d1.median) * factor,
    sd1pos: d1.sd1pos + (d2.sd1pos - d1.sd1pos) * factor,
    sd1neg: d1.sd1neg + (d2.sd1neg - d1.sd1neg) * factor,
    sd2pos: d1.sd2pos + (d2.sd2pos - d1.sd2pos) * factor,
    sd2neg: d1.sd2neg + (d2.sd2neg - d1.sd2neg) * factor,
    sd3pos: d1.sd3pos + (d2.sd3pos - d1.sd3pos) * factor,
    sd3neg: d1.sd3neg + (d2.sd3neg - d1.sd3neg) * factor,
  };
}

/**
 * Finds the appropriate Growth parameters for a given age or height.
 */
export function findGrowthParameters(value: number, dataset: GrowthData[], key: string): GrowthData {
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

  return interpolateGrowthData(value, d1[key], d2[key], d1, d2);
}

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
