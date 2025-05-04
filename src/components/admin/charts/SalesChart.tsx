import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SalesChartProps {
  className?: string;
}

export const SalesChart: React.FC<SalesChartProps> = ({ className = '' }) => {
  const data: ChartData<'line'> = {
    labels: Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' });
    }),
    datasets: [
      {
        label: 'Продажі',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 500),
        borderColor: '#2E7D32',
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            return `Продажі: ₴${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₴${value}`,
        },
      },
    },
    hover: {
      mode: 'nearest',
      intersect: false,
    },
  };

  return (
    <div className={`h-80 ${className}`}>
      <Line data={data} options={options} />
    </div>
  );
};