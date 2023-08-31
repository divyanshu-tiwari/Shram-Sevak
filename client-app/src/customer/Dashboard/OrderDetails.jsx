import React, { useState, useEffect } from 'react';
import axios from 'axios';
import store from '../../utils/store/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const stringValue = store.getState().user.value.id;
      const longNumber = parseInt(stringValue, 10);
      const response = await axios.get(`http://localhost:8080/order/customer/${longNumber}`); 
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.patch(`http://localhost:8080/order/cancel/${orderId}`). then((response) => {
        console.log(response.data);
       
         
        
        alert("Order cancelled successfully!");

      })
      fetchOrders();
      toast.success('Order cancelled successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Failed to cancel order. Please try again later.', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };

  return (
    <div className="py-10 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400">
      <h1 className="text-2xl font-semibold mb-4 text-white">
        {store.getState().user.value.firstName}, Your Orders
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Start Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">End Time</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map(order => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">{order.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.startTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.endTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full"
                  >
                    Cancel Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
