// src/SalesChart.js
import React from "react";
import Chart from "react-apexcharts";

const SalesChart = () => {
  const chartOptions = {
    chart: {
      id: "basic-line",
    },
    xaxis: {
      categories: ["1", "2", "3", "4"],
    },
  };

  const chartSeries = [
    {
      name: "Sales Data",
      data: [30, 50, 70, 40],
    },
  ];

  return (
    <div className="chart-container">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={300}
      />
    </div>
  );
};
export default SalesChart;
