/**
 * DATA STANDAR ANTROPOMETRI ANAK KEMENKES RI (PERMENKES NO 2 TAHUN 2020)
 * Data diimpor langsung dari CSV Bos Adam
 */

// BB/U (Berat menurut Umur) - Laki-laki 0-60 Bulan
export const wfa_boys = [
  { day: 0, sd3neg: 2.1, sd2neg: 2.5, sd1neg: 2.9, median: 3.3, sd1pos: 3.9, sd2pos: 4.4, sd3pos: 5.0 },
  { day: 30, sd3neg: 2.9, sd2neg: 3.4, sd1neg: 3.9, median: 4.5, sd1pos: 5.1, sd2pos: 5.8, sd3pos: 6.6 },
  { day: 61, sd3neg: 3.8, sd2neg: 4.3, sd1neg: 4.9, median: 5.6, sd1pos: 6.3, sd2pos: 7.1, sd3pos: 8.0 },
  { day: 91, sd3neg: 4.4, sd2neg: 5.0, sd1neg: 5.7, median: 6.4, sd1pos: 7.2, sd2pos: 8.0, sd3pos: 9.0 },
  { day: 122, sd3neg: 4.9, sd2neg: 5.6, sd1neg: 6.2, median: 7.0, sd1pos: 7.8, sd2pos: 8.7, sd3pos: 9.7 },
  { day: 152, sd3neg: 5.3, sd2neg: 6.0, sd1neg: 6.7, median: 7.5, sd1pos: 8.4, sd2pos: 9.3, sd3pos: 10.4 },
  { day: 183, sd3neg: 5.7, sd2neg: 6.4, sd1neg: 7.1, median: 7.9, sd1pos: 8.8, sd2pos: 9.8, sd3pos: 10.9 },
  { day: 365, sd3neg: 6.9, sd2neg: 7.7, sd1neg: 8.6, median: 9.6, sd1pos: 10.8, sd2pos: 12.0, sd3pos: 13.3 },
  { day: 730, sd3neg: 8.6, sd2neg: 9.7, sd1neg: 10.8, median: 12.2, sd1pos: 13.6, sd2pos: 15.3, sd3pos: 17.1 },
  { day: 1095, sd3neg: 10.0, sd2neg: 11.3, sd1neg: 12.7, median: 14.3, sd1pos: 16.2, sd2pos: 18.3, sd3pos: 20.7 },
  { day: 1461, sd3neg: 11.2, sd2neg: 12.7, sd1neg: 14.4, median: 16.3, sd1pos: 18.6, sd2pos: 21.2, sd3pos: 24.2 },
  { day: 1826, sd3neg: 12.4, sd2neg: 14.1, sd1neg: 16.0, median: 18.3, sd1pos: 21.0, sd2pos: 24.2, sd3pos: 27.9 }
];

// TB/U (Tinggi menurut Umur) - Laki-laki 0-60 Bulan
export const hfa_boys = [
  { day: 0, sd3neg: 44.2, sd2neg: 46.1, sd1neg: 48.0, median: 49.9, sd1pos: 51.8, sd2pos: 53.7, sd3pos: 55.6 },
  { day: 183, sd3neg: 61.2, sd2neg: 63.3, sd1neg: 65.5, median: 67.6, sd1pos: 69.8, sd2pos: 71.9, sd3pos: 74.0 },
  { day: 365, sd3neg: 68.6, sd2neg: 71.0, sd1neg: 73.4, median: 75.7, sd1pos: 78.1, sd2pos: 80.5, sd3pos: 82.9 },
  { day: 730, sd3neg: 78.0, sd2neg: 81.0, sd1neg: 84.1, median: 87.1, sd1pos: 90.2, sd2pos: 93.2, sd3pos: 96.3 },
  { day: 1095, sd3neg: 85.0, sd2neg: 88.7, sd1neg: 92.4, median: 96.1, sd1pos: 99.8, sd2pos: 103.5, sd3pos: 107.2 },
  { day: 1461, sd3neg: 90.7, sd2neg: 94.9, sd1neg: 99.1, median: 103.3, sd1pos: 107.5, sd2pos: 111.7, sd3pos: 115.9 },
  { day: 1826, sd3neg: 96.1, sd2neg: 100.7, sd1neg: 105.3, median: 110.0, sd1pos: 114.6, sd2pos: 119.2, sd3pos: 123.9 }
];

// BB/TB (Berat menurut Tinggi) - Laki-laki 45-120cm
export const wfh_boys = [
  { height: 45.0, sd3neg: 1.9, sd2neg: 2.0, sd1neg: 2.2, median: 2.4, sd1pos: 2.7, sd2pos: 3.0, sd3pos: 3.3 },
  { height: 50.0, sd3neg: 2.6, sd2neg: 2.8, sd1neg: 3.0, median: 3.3, sd1pos: 3.6, sd2pos: 4.0, sd3pos: 4.4 },
  { height: 60.0, sd3neg: 4.7, sd2neg: 5.1, sd1neg: 5.5, median: 6.0, sd1pos: 6.5, sd2pos: 7.1, sd3pos: 7.8 },
  { height: 70.0, sd3neg: 6.6, sd2neg: 7.2, sd1neg: 7.8, median: 8.4, sd1pos: 9.2, sd2pos: 10.0, sd3pos: 10.9 },
  { height: 80.0, sd3neg: 8.2, sd2neg: 8.9, sd1neg: 9.6, median: 10.4, sd1pos: 11.4, sd2pos: 12.4, sd3pos: 13.6 },
  { height: 85.0, sd3neg: 9.1, sd2neg: 9.8, sd1neg: 10.6, median: 11.5, sd1pos: 12.5, sd2pos: 13.6, sd3pos: 14.9 },
  { height: 90.0, sd3neg: 10.1, sd2neg: 10.9, sd1neg: 11.8, median: 12.7, sd1pos: 13.8, sd2pos: 15.0, sd3pos: 16.4 },
  { height: 100.0, sd3neg: 12.0, sd2neg: 12.9, sd1neg: 14.0, median: 15.2, sd1pos: 16.5, sd2pos: 18.0, sd3pos: 19.6 },
  { height: 110.0, sd3neg: 14.2, sd2neg: 15.4, sd1neg: 16.8, median: 18.3, sd1pos: 20.0, sd2pos: 21.9, sd3pos: 24.1 },
  { height: 120.0, sd3neg: 17.1, sd2neg: 18.6, sd1neg: 20.4, median: 22.4, sd1pos: 24.6, sd2pos: 27.2, sd3pos: 30.1 }
];

// DATA PEREMPUAN (GIRLS) - Menggunakan Milestone serupa
export const wfa_girls = [
  { day: 0, sd3neg: 2.0, sd2neg: 2.4, sd1neg: 2.8, median: 3.2, sd1pos: 3.7, sd2pos: 4.2, sd3pos: 4.8 },
  { day: 365, sd3neg: 6.3, sd2neg: 7.0, sd1neg: 7.9, median: 8.9, sd1pos: 10.1, sd2pos: 11.5, sd3pos: 13.1 },
  { day: 730, sd3neg: 8.1, sd2neg: 9.0, sd1neg: 10.2, median: 11.5, sd1pos: 13.0, sd2pos: 14.8, sd3pos: 17.0 },
  { day: 1095, sd3neg: 9.6, sd2neg: 10.8, sd1neg: 12.2, median: 13.9, sd1pos: 15.8, sd2pos: 18.1, sd3pos: 20.9 },
  { day: 1826, sd3neg: 12.1, sd2neg: 13.7, sd1neg: 15.8, median: 18.2, sd1pos: 21.2, sd2pos: 24.9, sd3pos: 29.5 }
];

export const hfa_girls = [
  { day: 0, sd3neg: 43.6, sd2neg: 45.4, sd1neg: 47.3, median: 49.1, sd1pos: 51.0, sd2pos: 52.9, sd3pos: 54.7 },
  { day: 365, sd3neg: 66.3, sd2neg: 68.9, sd1neg: 71.4, median: 74.0, sd1pos: 76.6, sd2pos: 79.2, sd3pos: 81.7 },
  { day: 730, sd3neg: 76.0, sd2neg: 79.3, sd1neg: 82.5, median: 85.7, sd1pos: 88.9, sd2pos: 92.2, sd3pos: 95.4 },
  { day: 1095, sd3neg: 83.6, sd2neg: 87.4, sd1neg: 91.2, median: 95.1, sd1pos: 98.9, sd2pos: 102.7, sd3pos: 106.5 },
  { day: 1826, sd3neg: 95.2, sd2neg: 99.9, sd1neg: 104.7, median: 109.4, sd1pos: 114.2, sd2pos: 118.9, sd3pos: 123.7 }
];

export const wfh_girls = [
  { height: 45.0, sd3neg: 1.9, sd2neg: 2.1, sd1neg: 2.3, median: 2.5, sd1pos: 2.7, sd2pos: 3.0, sd3pos: 3.3 },
  { height: 60.0, sd3neg: 4.5, sd2neg: 4.9, sd1neg: 5.4, median: 5.9, sd1pos: 6.4, sd2pos: 7.1, sd3pos: 7.8 },
  { height: 85.0, sd3neg: 8.7, sd2neg: 9.4, sd1neg: 10.3, median: 11.2, sd1pos: 12.3, sd2pos: 13.5, sd3pos: 14.9 },
  { height: 110.0, sd3neg: 14.0, sd2neg: 15.3, sd1neg: 16.7, median: 18.3, sd1pos: 20.2, sd2pos: 22.3, sd3pos: 24.7 },
  { height: 120.0, sd3neg: 17.3, sd2neg: 18.9, sd1neg: 20.7, median: 22.8, sd1pos: 25.2, sd2pos: 28.0, sd3pos: 31.2 }
];
