import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const processChartData = (data) => {
  const chartData = {
    datasets: [],
  };
  chartData.labels = data.map((item) => item.summary);
  
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim();
  const textColorLight = getComputedStyle(document.documentElement).getPropertyValue('--text-color-light').trim();

  chartData.datasets.push({
    data: data.map((item) => item.totalHours),
    label: "Hours",
    backgroundColor: `${primaryColor}99`, // Add 99 for 60% opacity
    borderColor: primaryColor,
    borderWidth: 1,
  });
  return chartData;
};

const ChartComponent = (props) => {
  const data = processChartData(props.data);

  // Get CSS variables for chart options
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim();
  const textColorLight = getComputedStyle(document.documentElement).getPropertyValue('--text-color-light').trim();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          color: textColorLight,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.x !== null) {
              label += context.parsed.x.toFixed(2) + ' hours';
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
          color: textColorLight,
        },
        ticks: {
          color: textColorLight,
        },
        grid: {
          color: `${textColorLight}33`, // Add 33 for 20% opacity
        },
      },
      y: {
        ticks: {
          color: textColorLight,
          callback: function(value, index, values) {
            return this.getLabelForValue(value).length > 20
              ? this.getLabelForValue(value).substr(0, 20) + '...'
              : this.getLabelForValue(value);
          }
        },
        grid: {
          color: `${textColorLight}33`, // Add 33 for 20% opacity
        },
      }
    }
  };

  return (
    <div style={{ height: '600px', width: '100%', backgroundColor: bgColor }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartComponent;