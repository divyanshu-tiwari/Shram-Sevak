import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <p className="text-2xl font-bold mb-4">
        Congratulations! Your account has been created.
      </p>
      <p className="text-lg text-center mb-4">
        Click on Log In to start getting work.
      </p>
      <Link to="/loginWorker" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Log In
      </Link>
    </div>
  );
};

export default RegistrationSuccess;
