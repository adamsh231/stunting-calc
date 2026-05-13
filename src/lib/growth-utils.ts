/**
 * Simple Z-Score Calculation
 * Formula: Z = (Value - Median) / SD
 */

export interface GrowthData {
  median: number;
  sd: number;
  [key: string]: number;
}

export function calculateZScore(value: number, data: GrowthData): number {
  return (value - data.median) / data.sd;
}

export function interpolateGrowthData(x: number, x1: number, x2: number, d1: GrowthData, d2: GrowthData): GrowthData {
  const factor = (x - x1) / (x2 - x1);
  return {
    median: d1.median + (d2.median - d1.median) * factor,
    sd: d1.sd + (d2.sd - d1.sd) * factor,
  };
}

export function findGrowthParameters(value: number, dataset: GrowthData[], key: string): GrowthData {
  const exact = dataset.find((d) => d[key] === value);
  if (exact) return exact;

  const sorted = [...dataset].sort((a, b) => a[key] - b[key]);
  const index = sorted.findIndex((d) => d[key] > value);

  if (index === 0) return sorted[0];
  if (index === -1) return sorted[sorted.length - 1];

  return interpolateGrowthData(value, sorted[index - 1][key], sorted[index][key], sorted[index - 1], sorted[index]);
}

export function getStatusWFA(zScore: number): string {
  if (zScore < -3) return "Berat badan sangat kurang";
  if (zScore < -2) return "Berat badan kurang";
  if (zScore <= 1) return "Berat badan normal";
  return "Risiko berat badan lebih";
}

export function getStatusHFA(zScore: number): string {
  if (zScore < -3) return "Sangat pendek (Stunting Berat)";
  if (zScore < -2) return "Pendek (Stunting)";
  if (zScore <= 2) return "Normal";
  return "Tinggi";
}

export function getStatusWFH(zScore: number): string {
  if (zScore < -3) return "Gizi buruk";
  if (zScore < -2) return "Gizi kurang";
  if (zScore <= 1) return "Gizi baik (Normal)";
  if (zScore <= 2) return "Berisiko gizi lebih";
  return "Obesitas";
}
