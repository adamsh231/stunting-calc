/**
 * Dynamic CSV Data Loader for Growth Standards
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
 * Parses CSV text into GrowthData array
 */
export function parseGrowthCSV(csvText: string, keyName: string): GrowthData[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(Number);
    const obj: any = {};
    
    // Mapping headers to standard keys
    // CSV format: Umur (bulan),-3 SD,-2 SD,-1 SD,Median,+1 SD,+2 SD,+3 SD
    obj[keyName] = values[0];
    obj.sd3neg = values[1];
    obj.sd2neg = values[2];
    obj.sd1neg = values[3];
    obj.median = values[4];
    obj.sd1pos = values[5];
    obj.sd2pos = values[6];
    obj.sd3pos = values[7];
    
    return obj as GrowthData;
  });
}

/**
 * Fetches growth data from public CSV files
 */
export async function loadGrowthData() {
  const [wfaRes, hfaRes, wfhRes] = await Promise.all([
    fetch('/data/bb_u.csv').then(r => r.text()),
    fetch('/data/tb_u.csv').then(r => r.text()),
    fetch('/data/bb_tb.csv').then(r => r.text())
  ]);

  return {
    wfa: parseGrowthCSV(wfaRes, 'day'), // day in CSV is actually months, we'll handle conversion
    hfa: parseGrowthCSV(hfaRes, 'day'),
    wfh: parseGrowthCSV(wfhRes, 'height')
  };
}
