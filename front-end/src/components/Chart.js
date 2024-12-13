import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

// Register components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Charts = ({ data }) => {
  // Convert raw data to chart data format
  const formatData = (data, label) => {
    return {
      labels: Object.keys(data),
      datasets: [
        {
          label: label,
          data: Object.values(data),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const protocolData = formatData(data.proto, 'Protocols');
  const srcIPData = formatData(data.src, 'Source IP Addresses');
  const dstIPData = formatData(data.dst, 'Destination IP Addresses');
  const packetLengthData = formatData({ 'Total Length': data.totalLength }, 'Packet Length');

  return (
    <div className="charts-container">
      <div className="chart">
        <h2>Protocol Distribution</h2>
        <Bar data={protocolData} options={chartOptions} />
      </div>
      <div className="chart">
        <h2>Source IP Addresses</h2>
        <Pie data={srcIPData} options={chartOptions} />
      </div>
      <div className="chart">
        <h2>Destination IP Addresses</h2>
        <Line data={dstIPData} options={chartOptions} />
      </div>
      <div className="chart">
        <h2>Packet Length</h2>
        <Bar data={packetLengthData} options={chartOptions} />
      </div>
    </div>
  );
};

const chartOptions = {
  plugins: {
    tooltip: {
      callbacks: {
        label: function(tooltipItem) {
          return `${tooltipItem.label}: ${tooltipItem.raw}`;
        },
      },
    },
    legend: {
      display: true,
      position: 'top',
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

export default Charts;
