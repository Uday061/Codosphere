// src/components/BarChart.js
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';

const fetchData = async (codeForcesHandle) => {
  const response = await fetch(`https://codeforces.com/api/user.status?handle=${codeForcesHandle}`);
  const data = await response.json();
  return data.result.filter(submission => submission.verdict === 'OK');
};

const processChartData = (submissions) => {
  const problemRatings = {};
  const tagsCount = {};

  submissions.forEach(submission => {
    const { rating, tags } = submission.problem;

    // Count problem ratings
    if (rating) {
      if (!problemRatings[rating]) problemRatings[rating] = 0;
      problemRatings[rating] += 1;
    }

    // Count tags
    tags.forEach(tag => {
      if (!tagsCount[tag]) tagsCount[tag] = 0;
      tagsCount[tag] += 1;
    });
  });

  return {
    problemRatings: Object.entries(problemRatings).map(([rating, count]) => ({ rating: parseInt(rating), count })),
    tagsCount: Object.entries(tagsCount).map(([tag, count]) => ({ tag, count }))
  };
};

const RatVsProb = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user.codeForcesHandle) {
      const getData = async () => {
        const submissions = await fetchData(user.codeForcesHandle);
        const { problemRatings } = processChartData(submissions);
        setData(problemRatings);
      };
      getData();
    }
  }, [user]);

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
