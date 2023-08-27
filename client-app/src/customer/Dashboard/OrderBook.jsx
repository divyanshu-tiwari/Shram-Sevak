import React, { useState } from 'react';
import store from "../../utils/store/store"
import { useParams } from 'react-router-dom';
import axios from 'axios';



const timeSlotOptions = [
    { label: '9-11', start: '09', end: '11' },
    { label: '11-1', start: '11', end: '13' },
    { label: '1-3', start: '13', end: '15' },
    { label: '3-5', start: '15', end: '17' },
  ];

const OrderBookComponent = () => {

    const { workerId } = useParams(); 
  
  const [order, setOrder] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    customerId:store.getState().user.value.id ,
    workerId: workerId
  });

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value
    });
  };

  const handleTimeSlotChange = (selectedSlot) => {
    const selectedTimeSlot = timeSlotOptions.find((slot) => slot.label === selectedSlot);
    if (selectedTimeSlot) {
      const currentTime = new Date().toISOString().slice(0, 10); // Get the current date in the format "yyyy-MM-dd"
      const startTime = `${currentTime}T${selectedTimeSlot.start}:00`; // Concatenate the current date and start time
      const endTime = `${currentTime}T${selectedTimeSlot.end}:00`; // Concatenate the current date and end time
  
      setOrder({
        ...order,
        startTime,
        endTime,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(order));
  
    // Send order to backend using Axios
    axios
      .post('http://localhost:8080/order/create', order, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // Handle response from backend if needed
        console.log(response.data);
        // Reset form after successful submission
        setOrder({
          title: '',
          description: '',
          startTime: '',
          endTime: '',
          customerId: null,
          workerId: null,
        });
      })
      .catch((error) => {
        // Handle error if needed
        console.error(error);
      });
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={order.title} onChange={handleChange} />
      </label>
      <label>
        Description:
        <input type="text" name="description" value={order.description} onChange={handleChange} />
      </label>
      <label>
        Time Slot:
        <select name="timeSlot" value={order.timeSlot} onChange={(e) => handleTimeSlotChange(e.target.value)}>
          <option value="">Select Time Slot</option>
          {timeSlotOptions.map((slot) => (
            <option key={slot.label} value={slot.label}>
              {slot.label}
            </option>
          ))}
        </select>
      </label>
      
      <label>
        Customer ID:
        <input type="number" name="customerId" value={store.getState().user.value.id}  readonly />
      </label>
      <label>
        Worker ID:
        <input type="number" name="workerId" value={workerId} readOnly />
      </label>
      <button type="submit">Create Order</button>
    </form>
  );
};

export default OrderBookComponent;