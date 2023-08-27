import React, { useState } from 'react';


const OrderBookComponent = () => {
  const [order, setOrder] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    customerId: null,
    workerId: null
  });

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send order to backend using fetch or any other HTTP client library
    fetch('/api/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
      .then(response => response.json())
      .then(data => {
        // Handle response from backend if needed
        console.log(data);
        // Reset form after successful submission
        setOrder({
          title: '',
          description: '',
          startTime: '',
          endTime: '',
          customerId: null,
          workerId: null
        });
      })
      .catch(error => {
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
        Start Time:
        <input type="text" name="startTime" value={order.startTime} onChange={handleChange} />
      </label>
      <label>
        End Time:
        <input type="text" name="endTime" value={order.endTime} onChange={handleChange} />
      </label>
      <label>
        Customer ID:
        <input type="number" name="customerId" value={order.customerId} onChange={handleChange} />
      </label>
      <label>
        Worker ID:
        <input type="number" name="workerId" value={order.workerId} onChange={handleChange} />
      </label>
      <button type="submit">Create Order</button>
    </form>
  );
};

export default OrderBookComponent;