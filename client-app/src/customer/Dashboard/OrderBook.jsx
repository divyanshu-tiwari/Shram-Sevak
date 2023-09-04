import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SecurityUpdateGood } from '@mui/icons-material';

// const timeSlotOptions = [
//   { label: '9-11', start: '09', end: '11' },
//   { label: '11-1', start: '11', end: '13' },
//   { label: '1-3', start: '13', end: '15' },
//   { label: '3-5', start: '15', end: '17' },
// ];

const OrderBookComponent = ({ myOrder, onOrderChange, changePage }) => {
  const { workerId } = useParams();

  const handleChange = (e) => {
    onOrderChange({
      ...myOrder,
      [e.target.name]: e.target.value,
    });
  };

  // const handleTimeSlotChange = (selectedSlot) => {
  //   const selectedTimeSlot = timeSlotOptions.find((slot) => slot.label === selectedSlot);
  //   if (selectedTimeSlot) {
  //     const currentTime = new Date().toISOString().slice(0, 10);
  //     const startTime = `${currentTime}T${selectedTimeSlot.start}:00`;
  //     const endTime = `${currentTime}T${selectedTimeSlot.end}:00`;

  //     onOrderChange({
  //       ...myOrder,
  //       startTime,
  //       endTime,
  //     });
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    axios
      .post('http://localhost:8080/order/create', myOrder, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        onOrderChange(response.data
         
        );
       

      })
      .catch((error) => {
        console.error(error);
      });

      changePage(false)
  };

  return (
    <div className="bg-gray-100 rounded-lg p-8"> 
    <form onSubmit={handleSubmit} className="flex flex-col">
  <label className="mb-4">
    <span className="mr-2">Title:</span>
    <input type="text" name="title" value={myOrder.title} onChange={handleChange} className="border border-gray-300 rounded-md p-2" />
  </label>
  <label className="mb-4">
    <span className="mr-2">Description:</span>
    <input type="text" name="description" value={myOrder.description} onChange={handleChange} className="border border-gray-300 rounded-md p-2" />
  </label>
  {/* <label className="mb-4">
    <span className="mr-2">Time Slot:</span>
    <select name="timeSlot" value={myOrder.timeSlot} onChange={(e) => handleTimeSlotChange(e.target.value)} className="border border-gray-300 rounded-md p-2">
      <option value="">Select Time Slot</option>
      {timeSlotOptions.map((slot) => (
        <option key={slot.label} value={slot.label}>
          {slot.label}
        </option>
      ))}
    </select>
  </label> */}
  <label className="mb-4">
    <span className="mr-2">Customer ID:</span>
    <input type="number" name="customerId" value={myOrder.customerId} readOnly className="border border-gray-300 rounded-md p-2" />
  </label>
  <label className="mb-4">
    <span className="mr-2">Worker ID:</span>
    <input type="number" name="workerId" value={workerId} readOnly className="border border-gray-300 rounded-md p-2" />
  </label>
  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Order</button>
</form>
</div>
  );
};

export default OrderBookComponent;