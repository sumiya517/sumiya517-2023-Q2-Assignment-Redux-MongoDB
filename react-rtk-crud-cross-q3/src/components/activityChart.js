import React from "react";
import Chart from "react-apexcharts";

const ActivityChart = () => {
  const options = {
    series: [
      {
        name: "Night Visits",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Day Visits",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    chart: {
      height: 300,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <div className="chart-container">
      <Chart
        options={options}
        series={options.series}
        type="area"
        height={300}
      />
    </div>
  );
};

export default ActivityChart;
