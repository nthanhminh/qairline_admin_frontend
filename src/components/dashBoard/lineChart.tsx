import React, { useEffect, useRef } from "react";
import { Chart, LineController, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from "chart.js";

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

interface LineChartProps {
  labels: string[];
  data: number[];
  label?: string;
}

const LineChart: React.FC<LineChartProps> = ({ labels, data, label = "Doanh thu" }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: label,
                data: data,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true,
              },
            },
            scales: {
              x: {
                display: true,
                grid: {
                  color: "transparent",
                  display: false,
                },
              },
              y: {
                display: true,
                beginAtZero: true,
                grid: {
                  color: "transparent",
                  display: false,
                },
                ticks: {
                  stepSize: 5000,
                },
              },
            },
            layout: {
              padding: 0,
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [labels, data]);

  return <canvas ref={chartRef}></canvas>;
};

export default LineChart;
