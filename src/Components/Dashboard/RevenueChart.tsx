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
  TooltipItem,
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

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem: TooltipItem<"line">) => {
          return `${tooltipItem.dataset.label}: ${tooltipItem.raw} units`;
        },
      },
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

const labels = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];


interface RevenueChartProps {
  salesData: number[];
  purchaseData: number[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ salesData, purchaseData }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Purchase",
        data: purchaseData,
        borderColor: "#FF0000",
        borderDash: [5, 5],
        borderWidth: 1,
      },
      {
        label: "Sale",
        data: salesData,
        borderColor: "#00FF00",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-[330px] w-full my-5 bg-neutral-60 p-6 rounded-2xl mb-4">
      <div className="flex justify-start gap-4 items-center">
        <h1 className="font-inter text-sm font-semibold leading-5 text-left text-neutral-5">
          Sales v/s Purchase <span className="w-[2px] h-2 bg-black"></span> <span className="font-inter text-xs font-normal leading-5 text-left">
            {"2025"}
          </span>
        </h1>
        <div className="flex justify-start gap-[5px] items-center">
          <div className="w-[6px] h-[6px] bg-[#00FF00] rounded-full"></div>
          <span className="font-inter text-xs font-normal leading-5 text-left">
            Sale
          </span>
        </div>
        <div className="flex justify-start gap-[5px] items-center">
          <div className="w-[6px] h-[6px] bg-[#FF0000] rounded-full"></div>
          <span className="font-inter text-xs font-normal leading-5 text-left">
            Purchase
          </span>
        </div>
      </div>
      <Line options={options} data={data} style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default RevenueChart;
