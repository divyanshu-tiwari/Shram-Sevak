import React from "react";
import CustomerImg from "../../../../../Images/customer.jpg"
import WorkerImg from "../../../../../Images/worker.jpg"
import { useNavigate } from 'react-router-dom'
import Navigation from "../../../navigation/Navigation";

const ChooseLogin = ({ showNavbar=true }) => {
  const navigate = useNavigate();

  const handleClickCustomer = () => {
    navigate('/loginCustomer')
  };

  const handleClickWorker = () => {
    navigate('/loginWorker')
  };

  return (
    <>{ showNavbar && <Navigation />}
    <div className="flex justify-center">
      
      <div className="flex flex-col items-center">
        <img
          src={CustomerImg}
          alt="Image 1"
          className="h-[25rem] w-[25rem] p-4"
        />
        <h3 className="text-2xl font-extrabold text-blue-800 py-5">
          LogIn As Customer
        </h3>
        <button
          className="mt-4 bg-red-500 text-white hover:bg-yellow-500 hover:text-white text-white-800 font-bold py-2 px-4 rounded-full"
          onClick={handleClickCustomer}
        >
          Create Customer Account
        </button>
      </div>
      <div className="flex flex-col items-center ml-8">
        <img
          src={WorkerImg}
          alt="Image 2"
          className="h-[25rem] w-[25rem] p-4"
        />
        <h3 className="text-2xl font-extrabold text-blue-800 py-5">
          LogIn As Worker
        </h3>
        <button
          className="mt-4 bg-red-500 text-white hover:bg-yellow-500 hover:text-white text-white-800 font-bold py-2 px-4 rounded-full"
          onClick={handleClickWorker}
        >
          Create Worker Account
        </button>
      </div>
    </div>
    </>
  );
};

export default ChooseLogin;