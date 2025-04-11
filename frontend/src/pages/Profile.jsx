import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-3xl w-full mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-3xl md:text-2xl text-gray-800 font-semibold mb-8 md:mb-6 text-center pt-8">
          Profile
        </h1>
        <div className="bg-gray-50 p-4 rounded min-h-[300px]">
          {/* Profile form will go here */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
