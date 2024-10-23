import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false, // Ensure the chart occupies full height
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [0, 100, 40, 60, 500, 100, 90],
      borderColor: "#A8C5DA",
      borderDash: [5, 5],
      borderWidth: 1,
    },
    {
      label: "Dataset 2",
      data: [10, 200, 1, 500, 50, 40, 50],
      borderColor: "#000000",
      borderWidth: 1,
      borderDash: [],
    },
  ],
};

const RevenueChart = () => {
  return (
    <div className="h-[330px] w-full my-5 bg-neutral-60 p-6 rounded-2xl mb-4">
      <div className="flex justify-start gap-4 items-center">
        <h1 className="font-inter text-sm font-semibold leading-5 text-left text-neutral-5">
          {" "}
          Sales v/s Purchase{" "}
        </h1>
        <span className="font-inter text-sm font-normal leading-5 text-left  border-r-[1px] text-neutral-95 border-r-neutral-95 pr-4">
          2024
        </span>

        <div className="flex justify-start gap-[5px] items-center">
          <div className=" w-[6px] h-[6px] bg-black rounded-full"></div>
          <span className="font-inter text-xs font-normal leading-5 text-left">Sale</span>
        </div>
        <div className="flex justify-start gap-[5px] items-center">
        <div className=" w-[6px] h-[6px] bg-secondary-110 rounded-full"></div>
        <span className="font-inter text-xs font-normal leading-5 text-left">
          Purchase
        </span>
        </div>
      </div>
      <Line
        options={options}
        data={data}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default RevenueChart;
