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

const childPointPlugin = {
  id: 'childPointPlugin',
  afterDatasetsDraw(chart: any) {
    const { ctx, chartArea: { top, bottom, left, right }, scales: { x, y } } = chart;
    const dataset = chart.data.datasets[0];
    
    if (dataset.label === 'Posisi Anak') {
      const meta = chart.getDatasetMeta(0);
      meta.data.forEach((point: any) => {
        if (point && !point.skip && point.y !== undefined) {
          ctx.save();
          
          // Garis Vertikal
          ctx.beginPath();
          ctx.setLineDash([5, 5]);
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(point.x, bottom);
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = dataset.borderColor + '88';
          ctx.stroke();

          // Garis Horizontal
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(left, point.y);
          ctx.stroke();

          // Label nilai di titik (opsional tapi keren)
          ctx.restore();
        }
      });
    }
  }
};

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
    const m3sd = data.map(d => d.sd3neg);
    const m2sd = data.map(d => d.sd2neg);
    const median = data.map(d => d.median);
    const p2sd = data.map(d => d.sd2pos);
    const p3sd = data.map(d => d.sd3pos);

    const childData = useMemo(() => {
      if (!childPoint) return [];
      let closestIndex = 0;
      let minDiff = Math.abs(data[0][xKey] - childPoint.x);
      
      for (let i = 1; i < data.length; i++) {
        const diff = Math.abs(data[i][xKey] - childPoint.x);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = i;
        }
      }

      const pointData = new Array(data.length).fill(null);
      pointData[closestIndex] = childPoint.y;
      return pointData;
    }, [data, childPoint, xKey]);

    const pointColor = gender === 'male' ? '#2563eb' : '#db2777';

    return {
      labels,
      datasets: [
        {
          label: 'Posisi Anak',
          data: childData,
          borderColor: pointColor,
          backgroundColor: '#fff',
          pointBorderWidth: 4,
          pointRadius: 10,
          pointHoverRadius: 12,
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
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        padding: 16,
        cornerRadius: 16,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 12 },
        callbacks: {
          label: function(context: any) {
            const datasetLabel = context.dataset.label || '';
            const value = context.parsed.y;
            
            if (datasetLabel === 'Posisi Anak' && value !== null) {
              const refData = data[context.dataIndex];
              const { median, sd1pos, sd1neg } = refData;
              const val = value;
              
              const isAbove = val > median;
              const sdRef = isAbove ? sd1pos : sd1neg;
              const diff = (val - median).toFixed(2);
              const sdDiff = isAbove ? (sd1pos - median).toFixed(2) : (median - sd1neg).toFixed(2);
              const zScore = (parseFloat(diff) / parseFloat(sdDiff)).toFixed(2);

              return [
                `📍 Status: ${zScore} SD`,
                `──────────────────`,
                `• Nilai: ${val} ${yLabel.includes('Berat') ? 'kg' : 'cm'}`,
                `• Median: ${median}`,
                `• SD Ref: ${sdRef}`,
                `──────────────────`,
                `Rumus: (${val} - ${median}) / ${sdDiff}`,
                `Hasil: ${zScore}`
              ];
            }
            return `${datasetLabel}: ${value.toFixed(2)}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(226, 232, 240, 0.2)' },
        ticks: { color: '#94a3b8', font: { size: 9, weight: 'bold' } },
        title: {
          display: true,
          text: xKey === 'day' ? 'Umur (Bulan)' : 'Tinggi (cm)',
          color: '#64748b',
          font: { size: 9, weight: 'bold' }
        }
      },
      y: {
        grid: { color: 'rgba(226, 232, 240, 0.2)' },
        ticks: { color: '#94a3b8', font: { size: 9, weight: 'bold' } },
        title: {
          display: true,
          text: yLabel,
          color: '#64748b',
          font: { size: 9, weight: 'bold' }
        }
      },
    },
    animation: false,
  };

  return (
    <div className="w-full h-full min-h-[300px] flex flex-col">
      <div className="flex-1 w-full relative">
        <Line 
          ref={chartRef} 
          data={chartData} 
          options={options} 
          plugins={[childPointPlugin]} 
        />
      </div>
    </div>
  );
}
