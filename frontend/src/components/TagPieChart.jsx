// src/components/PieChart.js
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import { fetchData, processChartData } from '../utils/dataFetcher';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#8800FE', '#00AA9F', '#BBFF28', '#8042FF', '#33AA6A'
];

const TagPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const submissions = await fetchData();
      const { tagsCount } = processChartData(submissions);
      setData(tagsCount);
    };
    getData();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Tags Solved</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="tag"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default TagPieChart;
