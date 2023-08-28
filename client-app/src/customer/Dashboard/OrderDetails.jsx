import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import store from '../../utils/store/store';
// Redux action to set order data in the state
const setOrderData = (order) => ({
  type: 'SET_ORDER_DATA',
  payload: order,
});

const OrderDetails = () => {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const fetchOrderData = async () => {
    try {
      const stringValue = store.getState().user.value.id;
      const longNumber = parseInt(stringValue, 10);
      const response = await axios.get(`http://localhost:8080/order/customer/${longNumber}`); // Replace with your actual API endpoint
      dispatch(setOrderData(response.data));
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <div>
      {order ? (
        <div>
          <h1>{order.title}</h1>
          <p>Description: {order.description}</p>
          <p>Status: {order.status}</p>
          <p>Start Time: {order.startTime}</p>
          <p>End Time: {order.endTime}</p>
          {/* Render transaction details if available */}
          {order.transaction && (
            <div>
              <h2>Transaction Details:</h2>
              <p>Transaction ID: {order.transaction.id}</p>
              {/* Add more transaction details as needed */}
            </div>
          )}
        </div>
      ) : (
        <p>Loading order information...</p>
      )}
    </div>
  );
};

export default OrderDetails;
