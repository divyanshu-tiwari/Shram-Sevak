import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function ViewAllOrders() {
  const [orders, setOrders] = useState([]);
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch orders when component mounts
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/order/worker/${currentUser.value.id}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const markOrderAsCompleted = async (orderId) => {
    
      await axios.patch(`http://localhost:8080/order/fulfill/${orderId}`)
      .then(response=>{
        console.log("Ordered marked as fulfilled "+response.data)
        alert(response.data.message)
        // Refresh orders after marking as completed
        fetchOrders();
      })
      .catch(error=>{
        alert(JSON.stringify(error.response.data.message))
        console.log(error)
        
      })
  };

  return (
    <div className="p-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Start Time</th>
            <th className="py-2 px-4">End Time</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-200">
              <td className="py-2 px-4">{order.id}</td>
              <td className="py-2 px-4">{order.title}</td>
              <td className="py-2 px-4">{order.description}</td>
              <td className="py-2 px-4">{order.status}</td>
              <td className="py-2 px-4">{order.startTime}</td>
              <td className="py-2 px-4">{order.endTime}</td>
              <td className="py-2 px-4">
                {(order.status === 'CREATED' || order.status === 'CONFIRMED') && (
                  <button
                    onClick={() => markOrderAsCompleted(order.id)}
                    className="bg-gray-500 border-white text-white px-3 py-1  hover:bg-orange-600"
                  >
                    Mark Completed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAllOrders;
