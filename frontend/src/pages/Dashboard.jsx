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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full md:col-span-1 lg:col-span-1 flex justify-center">
          <UserCard user={user} />
        </div>
        
        <div className="col-span-full md:col-span-2 lg:col-span-2">
          <div className="flex flex-wrap justify-center gap-6">
            <RatingChart />
           
          </div>
          <div className="flex flex-wrap justify-center gap-6">
         
            <TagPieChart />
           
          </div>
          <div className="flex flex-wrap justify-center gap-6">
          
            <RatVsProb />
          </div>
        </div>
      </div>

      {user && !user.codeForcesHandle && (
        <div className="mt-8 flex justify-center">
          <AddForcesHandle />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
