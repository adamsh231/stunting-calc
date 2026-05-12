'use client';

import React from 'react';

interface DynamicSketchProps {
  status: string;
  gender: 'male' | 'female';
}

export default function DynamicSketch({ status, gender }: DynamicSketchProps) {
  // Determine sketch parameters based on status
  // Status categories from growth-utils.ts
  const isWasted = status.toLowerCase().includes('wasted') || status.toLowerCase().includes('kurang');
  const isOverweight = status.toLowerCase().includes('overweight') || status.toLowerCase().includes('lebih') || status.toLowerCase().includes('obesitas');
  const isStunted = status.toLowerCase().includes('stunted') || status.toLowerCase().includes('pendek');
  const isNormal = status.toLowerCase().includes('normal') || status.toLowerCase().includes('baik');

  // Scale factors
  let widthScale = 1.0;
  let heightScale = 1.0;

  if (isWasted) widthScale = 0.75;
  if (isOverweight) widthScale = 1.25;
  if (isStunted) heightScale = 0.85;

  const color = gender === 'male' ? '#2563eb' : '#db2777';
  const bgColor = gender === 'male' ? 'bg-blue-50 dark:bg-blue-900/10' : 'bg-pink-50 dark:bg-pink-900/10';

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${bgColor} rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-700 transition-all duration-1000 group`}>
      <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 mb-8 uppercase tracking-[0.2em]">Physical Projection</p>
      
      <div className="relative">
        <svg 
          viewBox="0 0 100 150" 
          className="w-40 h-60 transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)"
          style={{ transform: `scale(${widthScale}, ${heightScale})` }}
        >
          {/* Simple Toddler Sketch */}
          <g fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Head */}
            <circle cx="50" cy="30" r="16" />
            {/* Eyes */}
            <circle cx="44" cy="28" r="1.5" fill={color} />
            <circle cx="56" cy="28" r="1.5" fill={color} />
            {/* Smile */}
            <path d="M 42 36 Q 50 42 58 36" />
            
            {/* Body */}
            <path d="M 50 46 L 50 95" />
            
            {/* Arms */}
            <path d="M 50 58 L 25 75" className="animate-pulse" />
            <path d="M 50 58 L 75 75" className="animate-pulse" />
            
            {/* Legs */}
            <path d="M 50 95 L 35 135" />
            <path d="M 50 95 L 65 135" />
            
            {/* Belly indicator for overweight */}
            {isOverweight && (
              <path d="M 50 50 Q 80 72 50 95 Q 20 72 50 50" fill={color} fillOpacity="0.15" className="animate-in fade-in zoom-in duration-1000" />
            )}
            
            {/* Normal indicator */}
            {isNormal && !isStunted && (
              <path d="M 50 50 Q 65 72 50 95 Q 35 72 50 50" fill={color} fillOpacity="0.05" />
            )}
          </g>
        </svg>
        
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-yellow-400/20 blur-xl animate-blob"></div>
        <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-blue-400/20 blur-xl animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="mt-8 text-center">
        <div className={`inline-flex items-center px-6 py-2 rounded-2xl text-base font-black shadow-sm transition-all group-hover:scale-105 ${
          isWasted || isStunted ? 'bg-red-500 text-white dark:bg-red-600' :
          isOverweight ? 'bg-orange-500 text-white dark:bg-orange-600' :
          'bg-emerald-500 text-white dark:bg-emerald-600'
        }`}>
          {status}
        </div>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-3 font-bold uppercase tracking-widest">Calculated Status</p>
      </div>
    </div>
  );
}
