import React, { useEffect, useRef } from "react";
import { Chart, LineController, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from "chart.js";

// Đăng ký các thành phần
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const LineChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null); // Lưu trữ instance của biểu đồ

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        // Hủy biểu đồ nếu đã tồn tại
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        // Tạo biểu đồ mới và lưu instance
        chartInstance.current = new Chart(ctx, {
          type: "line", // Loại biểu đồ đường
          data: {
            labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
            datasets: [
              {
                label: "Doanh thu",
                data: [12000, 19000, 3000, 5000, 20000],
                backgroundColor: "rgba(75, 192, 192, 0.2)", // Màu nền
                borderColor: "rgba(75, 192, 192, 1)", // Màu đường
                borderWidth: 2, // Độ rộng đường viền
                fill: true, // Đổ màu nền dưới đường
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false, // Ẩn legend
              },
              tooltip: {
                enabled: true,
              },
            },
            scales: {
              x: {
                display: true,
                grid: {
                  color: "transparent", // Ẩn lưới trên trục x
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

    // Cleanup instance khi component bị unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Chạy khi component được render lần đầu

  return <canvas ref={chartRef}></canvas>;
};

export default LineChart;
