import React, { useState } from 'react';
import OrderBookComponent from './OrderBook';
import Cart from '../Dashboard/Cart';
import store from '../../utils/store/store';
import { useParams } from 'react-router-dom';
const ParentComponent = () => {
  const { workerId } = useParams();
  const {startTime} =useParams();
  const {endTime} = useParams();
  const [order, setOrder] = useState({
    id:'',
    title: '',
    description: '',
    startTime: startTime,
    endTime: endTime,
    customerId: store.getState().user.value.id,
    workerId: workerId,
    price:500,
  });

  

  const [orderBookingPage, setOrderBookingPage] = useState(true)

  return (
    <div>
      <h1>Order Booking</h1>
      {orderBookingPage && <OrderBookComponent myOrder={order} onOrderChange={setOrder} changePage={setOrderBookingPage} />}
      {!orderBookingPage && <Cart Order={order} onOrderChange={setOrder} changePage={setOrderBookingPage} />}
    </div>

  );
};

export default ParentComponent;