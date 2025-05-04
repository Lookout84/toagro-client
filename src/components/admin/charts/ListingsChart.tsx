import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ListingsChartProps {
  className?: string;
}

export const ListingsChart: React.FC<ListingsChartProps> = ({ className = '' }) => {
  const data: ChartData<'bar'> = {
    labels: ['Пшениця', 'Кукурудза', 'Соя', 'Картопля', 'Соняшник', 'Інше'],
    datasets: [
      {
        label: 'Кількість оголошень',
        data: [120, 85, 75, 60, 90, 45],
        backgroundColor: '#2E7D32',
        borderRadius: 4,
      },
      {
        label: 'Середня ціна (тис. ₴)',
        data: [6.5, 5.2, 12.8, 2.3, 15.6, 8.4],
        backgroundColor: '#A5D6A7',
        borderRadius: 4,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            if (label === 'Середня ціна (тис. ₴)') {
              return `${label}: ₴${context.parsed.y}k`;
            }
            return `${label}: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={`h-80 ${className}`}>
      <Bar data={data} options={options} />
    </div>
  );
};