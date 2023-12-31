import React from "react";
import Chart from "react-apexcharts";

const CategoriesChart = () => {
  const values = ["iphone", "imac", "laptops", "mac-studio", "ipods"];
  const seriesData = [44, 55, 41, 17, 15];

  const options = {
    series: seriesData,
    chart: {
      width: 380,
      type: "donut",
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      formatter: function (value, opts) {
        const index = opts.seriesIndex;
        return values[index] + " - " + opts.w.globals.series[index];
      },
    },
    title: {
      text: "Device Categories",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="chart-container">
      <Chart options={options} series={options.series} type="pie" height={300} />
    </div>
  );
};

export default CategoriesChart;
