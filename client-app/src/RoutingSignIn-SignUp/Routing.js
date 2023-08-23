import React from 'react';
import { useNavigate } from 'react-router-dom'
import React from 'react'
import './StyleRouting.css';

const Card = ({ type, imageSrc, onClick }) => {
  return (
    <div className={`card ${type}`} onClick={onClick}>
      <img src={imageSrc} alt={type} className="card-image" />
      {type}
    </div>
  );
};


function Routing() {
    const navigate = useNavigate();

    const handleClickCustomer = () => {
      navigate('/loginCustomer')
    };
    const handleClickWorker = () => {
      navigate('/loginWorker')
    };
 
  return (
    <div className="card-container">
    <Card
      type="customer"
      imageSrc="./customer-retention-vector-icon-client.avif"
      onClick={() => {handleClickCustomer}}
    />
    <Card
      type="worker"
      imageSrc="./download.png"
      onClick={() => handleClickWorker()}
    />
  </div>
  );
};

export default Routing