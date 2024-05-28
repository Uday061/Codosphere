import React from 'react';
import { useSelector } from 'react-redux';
import UserCard from "../components/UserCard";
import RatingChart from '../components/RatingsChart';
import AddForcesHandle from "../components/AddForcesHandle";
import TagPieChart from '../components/TagPieChart';
import RatVsProb from '../components/RatVsProb';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">User Dashboard</h1>
      
      <div className="flex flex-wrap justify-center">
        <UserCard user={user} />

        <RatingChart />
        <TagPieChart />
        <RatVsProb />
        { !( user.codeForcesHandle ) &&
            <AddForcesHandle />
        }
      </div>
      
    </div>
  );
};

export default Dashboard;
