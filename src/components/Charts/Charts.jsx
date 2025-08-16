import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

export const BarChart = ({ data, options }) => (
  <Bar data={data} options={options} />
);
export const PieChart = ({ data, options }) => (
  <Pie data={data} options={options} />
);
