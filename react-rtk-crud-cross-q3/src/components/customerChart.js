import React from "react";
import Chart from "react-apexcharts";

const CustomerSparklineChart = () => {
  // Hardcoded customer data (replace with your actual data)
  const customerData = [10, 20, 30, 25, 40, 35, 50];

  const options = {
    chart: {
      type: "area",
      height: 300,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      opacity: 0.3,
    },
    yaxis: {
      min: 0,
    },
    colors: ["#2196F3"],
    title: {
      text: "$424,652",
      offsetX: 0,
      style: {
        fontSize: "24px",
      },
    },
    subtitle: {
      text: "Sales",
      offsetX: 0,
      style: {
        fontSize: "14px",
      },
    }, // You can change the color to your preference
  };

  const series = [{ data: customerData }];

  return (
    <div className="chart-container">
      <Chart options={options} series={series} type="area" height={300} />
    </div>
  );
};

export default CustomerSparklineChart;
