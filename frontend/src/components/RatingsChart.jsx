import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const { name, rating, rank } = payload[0].payload;
        return (
            <div className="custom-tooltip">
                <p>{`Contest: ${name}`}</p>
                <p>{`Rating: ${rating}`}</p>
                <p>{`Rank: ${rank}`}</p>
                <style jsx>{`
            .custom-tooltip {
              border: 1px solid #ccc;
              background-color: #fff;
              padding: 10px;
            }
          `}</style>
            </div>
        );
    }

    return null;
};
const RatingChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://codeforces.com/api/user.rating?handle=rky_cse'); // replace with your actual API endpoint
                if (response.data.status === 'OK') {
                    const formattedData = response.data.result.map(contest => ({
                        name: contest.contestName,
                        rating: contest.newRating,
                        rank: contest.rank
                    }));
                    setData(formattedData);
                }
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="rating" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default RatingChart;
