import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function BarChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        // Destroy existing chart instance if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        // Create a new chart instance
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
            datasets: [
              {
                label: "Doanh thu",
                data: [12000, 19000, 3000, 5000, 20000],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)", // Cột 1: Màu đỏ nhạt
                  "rgba(54, 162, 235, 0.2)", // Cột 2: Màu xanh lam nhạt
                  "rgba(255, 206, 86, 0.2)", // Cột 3: Màu vàng nhạt
                  "rgba(75, 192, 192, 0.2)", // Cột 4: Màu xanh lá nhạt
                  "rgba(153, 102, 255, 0.2)", // Cột 5: Màu tím nhạt
                ],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false, // Hide legend
              },
              tooltip: {
                enabled: true, // Enable tooltips
              },
            },
            scales: {
              x: {
                grid: {
                  color: "transparent",
                  display: false, // Hide X-axis grid
                },
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: "transparent",
                  display: false, // Hide Y-axis grid
                },
                ticks: {
                  stepSize: 5000, // Set step size for Y-axis
                },
              },
            },
            layout: {
              padding: 0, // Remove padding
            },
            animation: {
              duration: 1000, // Thời gian hiệu ứng (ms)
              easing: "easeOutBounce", // Kiểu hiệu ứng
            },
          },
        });
      }
    }

    return () => {
      // Destroy chart instance on unmount
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return <canvas ref={chartRef}></canvas>;
}