// src/components/BarChart.js
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { fetchData, processChartData } from '../utils/dataFetcher';

const RatVsProb = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const submissions = await fetchData();
      const { problemRatings } = processChartData(submissions);
      setData(problemRatings);
    };
    getData();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Problem Ratings</h2>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="rating" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default RatVsProb;
