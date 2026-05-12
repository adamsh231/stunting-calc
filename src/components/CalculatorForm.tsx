'use client';

import React, { useState } from 'react';
import { 
  calculateZScore, 
  findLMS, 
  getStatusWFA, 
  getStatusHFA, 
  getStatusWFH 
} from '@/lib/growth-utils';
import { wfa_boys, hfa_boys, wfh_boys, wfa_girls, hfa_girls, wfh_girls } from '@/lib/who-data';
import GrowthChart from './GrowthChart';
import DynamicSketch from './DynamicSketch';

type Gender = 'male' | 'female';

export default function CalculatorForm() {
  const [gender, setGender] = useState<Gender>('male');
  const [ageMonths, setAgeMonths] = useState<string>('');
  const [weightKg, setWeightKg] = useState<string>('');
  const [heightCm, setHeightCm] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedResults, setCalculatedResults] = useState<any>(null);

  const handleCalculate = (e: React.MouseEvent) => {
    e.preventDefault();
    const age = parseFloat(ageMonths);
    const weight = parseFloat(weightKg);
    const height = parseFloat(heightCm);

    if (isNaN(age) || isNaN(weight) || isNaN(height) || age < 0 || age > 60) {
      return;
    }

    setIsCalculating(true);

    setTimeout(() => {
      const ageDays = age * 30.4375;
      try {
        const wfaData = gender === 'male' ? wfa_boys : wfa_girls;
        const hfaData = gender === 'male' ? hfa_boys : hfa_girls;
        const wfhData = gender === 'male' ? wfh_boys : wfh_girls;

        const wfaLMS = findLMS(ageDays, wfaData, 'day');
        const wfaZ = calculateZScore(weight, wfaLMS);

        const hfaLMS = findLMS(ageDays, hfaData, 'day');
        const hfaZ = calculateZScore(height, hfaLMS);

        const wfhLMS = findLMS(height, wfhData, 'height');
        const wfhZ = calculateZScore(weight, wfhLMS);

        setCalculatedResults({
          gender,
          ageMonths,
          weightKg,
          heightCm,
          wfa: { z: wfaZ, status: getStatusWFA(wfaZ) },
          hfa: { z: hfaZ, status: getStatusHFA(hfaZ) },
          wfh: { z: wfhZ, status: getStatusWFH(wfhZ) }
        });
      } catch (e) {
        console.error(e);
      } finally {
        setIsCalculating(false);
      }
    }, 800);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start max-w-[1400px] mx-auto p-4 md:p-0">
      {/* Input Form Column */}
      <div className="w-full lg:w-[400px] flex-shrink-0 p-8 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl space-y-8 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800 transition-all duration-500 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500"></div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50">Input Data</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Lengkapi data untuk analisis gizi</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-3 text-slate-400 dark:text-slate-500">Jenis Kelamin</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); setGender('male'); }}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer relative z-10 ${
                  gender === 'male' 
                    ? 'bg-blue-50 border-blue-600 text-blue-600 dark:bg-blue-900/20 dark:border-blue-500 dark:text-blue-400 shadow-md' 
                    : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600'
                }`}
              >
                <span className="text-sm font-black pointer-events-none">Laki-laki</span>
              </button>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); setGender('female'); }}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer relative z-10 ${
                  gender === 'female' 
                    ? 'bg-pink-50 border-pink-600 text-pink-600 dark:bg-pink-900/20 dark:border-pink-500 dark:text-pink-400 shadow-md' 
                    : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600'
                }`}
              >
                <span className="text-sm font-black pointer-events-none">Perempuan</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-slate-400 dark:text-slate-500">Umur (Bulan)</label>
              <div className="relative">
                <input
                  type="number"
                  value={ageMonths}
                  onChange={(e) => setAgeMonths(e.target.value)}
                  placeholder="0 - 60"
                  className="w-full pl-4 pr-12 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all shadow-sm"
                  min="0"
                  max="60"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">Mo</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-slate-400 dark:text-slate-500">Berat</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    placeholder="0.0"
                    className="w-full pl-4 pr-10 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all shadow-sm"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">kg</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-slate-400 dark:text-slate-500">Tinggi</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    placeholder="0.0"
                    className="w-full pl-4 pr-10 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all shadow-sm"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">cm</span>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCalculate}
            disabled={isCalculating || !ageMonths || !weightKg || !heightCm}
            className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] cursor-pointer relative z-10 ${
              isCalculating || !ageMonths || !weightKg || !heightCm
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-600'
                : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400'
            }`}
          >
            {isCalculating ? (
              <>
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Menghitung...</span>
              </>
            ) : (
              <span>Hitung Status Gizi</span>
            )}
          </button>
        </div>
      </div>

      {/* Results Column */}
      <div className="flex-1 w-full space-y-8">
        {calculatedResults ? (
          <div className="animate-in fade-in slide-in-from-right-8 duration-700 space-y-8 pb-12">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                <h3 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center">
                  <span className="w-8 h-8 bg-teal-500 text-white rounded-lg flex items-center justify-center mr-3 text-sm italic font-black">i</span>
                  Hasil Analisis Gizi
                </h3>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700 uppercase">
                  STANDAR KEMENKES 2020
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-[1.5rem] border-2 border-slate-100 dark:border-slate-800 shadow-inner mb-12">
                <DynamicSketch status={calculatedResults.wfh.status} gender={calculatedResults.gender} />
              </div>
              
              <div className="grid grid-cols-1 gap-12">
                {/* WFA Chart and Result */}
                <div className="bg-white dark:bg-slate-800/40 p-6 rounded-[1.5rem] border-2 border-slate-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2">BB/U (Berat / Umur)</p>
                    <div className="flex justify-between items-start">
                      <h4 className="text-xl font-black text-slate-900 dark:text-slate-100 leading-tight">{calculatedResults.wfa.status}</h4>
                      <div className="text-right">
                        <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{calculatedResults.wfa.z.toFixed(2)}</span>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Z-Score</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-[300px] w-full">
                    <GrowthChart 
                      title="Grafik Berat menurut Umur"
                      data={calculatedResults.gender === 'male' ? wfa_boys : wfa_girls}
                      childPoint={{ x: parseFloat(calculatedResults.ageMonths) * 30.4375, y: parseFloat(calculatedResults.weightKg) }}
                      xKey="day"
                      yLabel="Berat (kg)"
                      gender={calculatedResults.gender}
                    />
                  </div>
                </div>

                {/* HFA Chart and Result */}
                <div className="bg-white dark:bg-slate-800/40 p-6 rounded-[1.5rem] border-2 border-slate-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2">TB/U (Tinggi / Umur)</p>
                    <div className="flex justify-between items-start">
                      <h4 className="text-xl font-black text-slate-900 dark:text-slate-100 leading-tight">{calculatedResults.hfa.status}</h4>
                      <div className="text-right">
                        <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{calculatedResults.hfa.z.toFixed(2)}</span>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Z-Score</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-[300px] w-full">
                    <GrowthChart 
                      title="Grafik Tinggi menurut Umur"
                      data={calculatedResults.gender === 'male' ? hfa_boys : hfa_girls}
                      childPoint={{ x: parseFloat(calculatedResults.ageMonths) * 30.4375, y: parseFloat(calculatedResults.heightCm) }}
                      xKey="day"
                      yLabel="Tinggi (cm)"
                      gender={calculatedResults.gender}
                    />
                  </div>
                </div>

                {/* WFH Chart and Result */}
                <div className="bg-white dark:bg-slate-800/40 p-6 rounded-[1.5rem] border-2 border-slate-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2">BB/TB (Berat / Tinggi)</p>
                    <div className="flex justify-between items-start">
                      <h4 className="text-xl font-black text-slate-900 dark:text-slate-100 leading-tight">{calculatedResults.wfh.status}</h4>
                      <div className="text-right">
                        <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{calculatedResults.wfh.z.toFixed(2)}</span>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Z-Score</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-[300px] w-full">
                    <GrowthChart 
                      title="Grafik Berat menurut Tinggi"
                      data={calculatedResults.gender === 'male' ? wfh_boys : wfh_girls}
                      childPoint={{ x: parseFloat(calculatedResults.heightCm), y: parseFloat(calculatedResults.weightKg) }}
                      xKey="height"
                      yLabel="Berat (kg)"
                      gender={calculatedResults.gender}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 text-center">
            <h4 className="text-xl font-black text-slate-400 dark:text-slate-600 mb-2">Menunggu Data</h4>
            <p className="text-slate-400 dark:text-slate-600 max-w-xs font-medium">Klik tombol "Hitung" untuk melihat analisis lengkap.</p>
          </div>
        )}
      </div>
    </div>
  );
}
