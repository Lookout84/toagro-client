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

interface UsersChartProps {
  className?: string;
}

export const UsersChart: React.FC<UsersChartProps> = ({ className = '' }) => {
  const data: ChartData<'bar'> = {
    labels: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер'],
    datasets: [
      {
        label: 'Нові користувачі',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#4CAF50',
        borderColor: '#2E7D32',
        borderWidth: 1,
      },
      {
        label: 'Активні користувачі',
        data: [45, 49, 60, 71, 46, 45],
        backgroundColor: '#A5D6A7',
        borderColor: '#2E7D32',
        borderWidth: 1,
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