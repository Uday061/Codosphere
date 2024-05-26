// src/components/UserCard.js
import React from 'react';

const UserCard = ({ user }) => {
  if (!user) {
    return null; // Or you could return some placeholder content or message
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 m-4 w-full max-w-4xl mx-auto transform hover:scale-105 transition-transform duration-300 flex flex-col items-center">
      <div className="flex items-start w-full">
        <img
          className="rounded-full w-1/6 h-1/6 mr-4"
          src={user.picturePath || "default-profile.png"}
          alt={`${user.firstName} ${user.lastName}`}
        />
        <h2 className="text-4xl font-semibold text-center flex-1">
          {user.firstName} {user.lastName}
        </h2>
      </div>
      <div className="mt-8 w-full text-center">
        <p className="text-gray-600 mt-2">{user.email}</p>
        {user.location && (
          <p className="text-gray-600 mt-2">Location: {user.location}</p>
        )}
        {user.occupation && (
          <p className="text-gray-600 mt-2">Occupation: {user.occupation}</p>
        )}
        <p className="text-gray-600 mt-2">Friends: {user.friends.length}</p>
        {typeof user.viewedProfile === 'number' && (
          <p className="text-gray-600 mt-2">Viewed Profile: {user.viewedProfile}</p>
        )}
        {typeof user.impressions === 'number' && (
          <p className="text-gray-600 mt-2">Impressions: {user.impressions}</p>
        )}
      </div>
    </div>
  );
};

export default UserCard;
