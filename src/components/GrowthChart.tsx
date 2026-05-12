'use client';

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Scatter,
  ReferenceLine,
  Legend
} from 'recharts';

interface GrowthChartProps {
  data: any[];
  childPoint: { x: number; y: number } | null;
  xKey: string;
  yLabel: string;
  title: string;
  gender: 'male' | 'female';
}

/**
 * Calculates a value for a specific Z-score using LMS parameters.
 * Value = M * (1 + L * S * Z)^(1/L)
 */
function getValueForZ(lms: { l: number; m: number; s: number }, z: number): number {
  const { l, m, s } = lms;
  if (l === 0) {
    return m * Math.exp(s * z);
  }
  return m * Math.pow(1 + l * s * z, 1 / l);
}

export default function GrowthChart({ data, childPoint, xKey, yLabel, title, gender }: GrowthChartProps) {
  const chartData = useMemo(() => data.map(d => ({
    [xKey]: d[xKey],
    '-3SD': getValueForZ(d, -3),
    '-2SD': getValueForZ(d, -2),
    'Median': d.m,
    '+2SD': getValueForZ(d, 2),
    '+3SD': getValueForZ(d, 3),
  })), [data, xKey]);

  const scatterData = childPoint ? [{ x: childPoint.x, y: childPoint.y }] : [];
  const lineColor = gender === 'male' ? '#2563eb' : '#db2777';

  return (
    <div className="w-full h-64 mt-4 p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors overflow-hidden">
      <h4 className="text-sm font-bold text-center mb-2 text-slate-700 dark:text-slate-300">{title}</h4>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
          <XAxis 
            dataKey={xKey} 
            fontSize={10} 
            tick={{ fill: '#94a3b8' }} 
            label={{ value: xKey === 'day' ? 'Umur (Hari)' : 'Tinggi (cm)', position: 'insideBottom', offset: -10, fontSize: 10 }}
          />
          <YAxis 
            fontSize={10} 
            tick={{ fill: '#94a3b8' }} 
            width={40}
            label={{ value: yLabel, angle: -90, position: 'insideLeft', fontSize: 10, offset: 0 }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
          />
          <Line type="monotone" dataKey="-3SD" stroke="#ef4444" strokeDasharray="5 5" dot={false} strokeWidth={1} />
          <Line type="monotone" dataKey="-2SD" stroke="#f59e0b" strokeDasharray="5 5" dot={false} strokeWidth={1} />
          <Line type="monotone" dataKey="Median" stroke="#10b981" dot={false} strokeWidth={2} />
          <Line type="monotone" dataKey="+2SD" stroke="#f59e0b" strokeDasharray="5 5" dot={false} strokeWidth={1} />
          <Line type="monotone" dataKey="+3SD" stroke="#ef4444" strokeDasharray="5 5" dot={false} strokeWidth={1} />
          
          {childPoint && (
            <Scatter 
              data={scatterData} 
              fill={lineColor} 
              shape="circle" 
              name="Anak" 
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
