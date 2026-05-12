'use client';

import React, { useMemo, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GrowthChartProps {
  data: any[];
  childPoint: { x: number; y: number } | null;
  xKey: string;
  yLabel: string;
  title: string;
  gender: 'male' | 'female';
}

function getValueForZ(lms: { l: number; m: number; s: number }, z: number): number {
  const { l, m, s } = lms;
  if (l === 0) {
    return m * Math.exp(s * z);
  }
  return m * Math.pow(1 + l * s * z, 1 / l);
}

export default function GrowthChart({ data, childPoint, xKey, yLabel, title, gender }: GrowthChartProps) {
  const chartRef = useRef<ChartJS<'line'>>(null);

  const chartData: ChartData<'line'> = useMemo(() => {
    const labels = data.map(d => d[xKey]);
    const m3sd = data.map(d => getValueForZ(d, -3));
    const m2sd = data.map(d => getValueForZ(d, -2));
    const median = data.map(d => d.m);
    const p2sd = data.map(d => getValueForZ(d, 2));
    const p3sd = data.map(d => getValueForZ(d, 3));

    const childData = childPoint 
      ? data.map(d => (d[xKey] === childPoint.x ? childPoint.y : null))
      : [];

    const pointColor = gender === 'male' ? '#2563eb' : '#db2777';

    return {
      labels,
      datasets: [
        {
          label: 'Anak',
          data: childData,
          borderColor: pointColor,
          backgroundColor: pointColor,
          pointRadius: 8,
          pointHoverRadius: 10,
          showLine: false,
          zIndex: 10,
        },
        {
          label: 'Median',
          data: median,
          borderColor: '#10b981',
          borderWidth: 3,
          pointRadius: 0,
          fill: false,
          tension: 0.4,
        },
        {
          label: '±2SD',
          data: p2sd,
          borderColor: '#f59e0b',
          borderDash: [5, 5],
          borderWidth: 1.5,
          pointRadius: 0,
          fill: false,
          tension: 0.4,
        },
        {
          label: '',
          data: m2sd,
          borderColor: '#f59e0b',
          borderDash: [5, 5],
          borderWidth: 1.5,
          pointRadius: 0,
          fill: false,
          tension: 0.4,
        },
        {
          label: '±3SD',
          data: p3sd,
          borderColor: '#ef4444',
          borderDash: [5, 5],
          borderWidth: 1.5,
          pointRadius: 0,
          fill: false,
          tension: 0.4,
        },
        {
          label: '',
          data: m3sd,
          borderColor: '#ef4444',
          borderDash: [5, 5],
          borderWidth: 1.5,
          pointRadius: 0,
          fill: false,
          tension: 0.4,
        },
      ],
    };
  }, [data, childPoint, xKey, gender]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 5,
        right: 15
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          boxWidth: 12,
          font: { size: 10, weight: 'bold' },
          usePointStyle: true,
          filter: (item) => item.text !== ''
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12,
        cornerRadius: 12,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(226, 232, 240, 0.2)' },
        ticks: { color: '#94a3b8', font: { size: 10, weight: 'bold' } },
        title: {
          display: true,
          text: xKey === 'day' ? 'Umur (Hari)' : 'Tinggi (cm)',
          color: '#64748b',
          font: { size: 10, weight: 'bold' }
        }
      },
      y: {
        grid: { color: 'rgba(226, 232, 240, 0.2)' },
        ticks: { color: '#94a3b8', font: { size: 10, weight: 'bold' } },
        title: {
          display: true,
          text: yLabel,
          color: '#64748b',
          font: { size: 10, weight: 'bold' }
        }
      },
    },
    animation: false,
  };

  return (
    <div className="w-full h-full min-h-[300px] flex flex-col">
      <div className="flex-1 w-full relative">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
}
