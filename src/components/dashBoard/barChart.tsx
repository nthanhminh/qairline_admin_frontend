import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface BarChartProps {
  labels: string[];
  data: number[];
  backgroundColors?: string[];
  label?: string;
}

export default function BarChart({
  labels,
  data,
  backgroundColors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
  ],
  label = "Doanh thu",
}: BarChartProps) {
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
          type: "bar",
          data: {
            labels,
            datasets: [
              {
                label,
                data,
                backgroundColor: backgroundColors.slice(0, data.length),
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
                grid: {
                  color: "transparent",
                  display: false,
                },
              },
              y: {
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
            animation: {
              duration: 1000,
              easing: "easeOutBounce",
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
  }, [labels, data, backgroundColors, label]);

  return <canvas ref={chartRef}></canvas>;
}