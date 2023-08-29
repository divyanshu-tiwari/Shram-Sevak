import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import store from '../../utils/store/store';

const Cart = ({Order, onOrderChange, changePage}) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

 

  
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  // Function to display the Razorpay payment form
  const displayRazorPay = async (amount) => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      
      if (!res) {
        alert(
          "Failed to load Razorpay script. Please check your internet connection."
        );
        return;
      }

      const options = {
        key: "rzp_test_SEjji3qyqQbce3",
        currency: "INR",
        amount: amount * 100,
        name: "Shram Sevak",
        description: "Congratulations",
        handler: function (response) {
          alert("Payment successful");
         
          axios.patch(`http://localhost:8080/order/update-transaction`, { orderId:Order.id,transactionId: response.razorpay_payment_id, transactionStatus: "SUCCESS"})
          // Redirect or navigate to a success page
          navigate("/dashboardC");
        },
        prefill: {
          name: "Shram Sevak",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("An error occurred while displaying Razorpay:", error);
      alert("An error occurred while displaying Razorpay. Please try again.");
    }
  };

  return (
    <div className="center">
  <div className="h-screen bg-gray-100 pt-20 justify-between">
    <h1 className="mb-2 flex justify-between font-bold text-2xl">Service Information</h1>
    <div className="mx-auto justify-center xl:px-0 flex justify-center items-center">
      <div className="rounded-lg"></div>
      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="mb-2 flex justify-between">
          <p className="font-bold text-lg">Title:</p>
          <p className="text-gray-700">{Order.title}</p>
        </div>
        <div className="mb-2 flex justify-between">
          <p className="font-bold text-lg">Description:</p>
          <p className="text-gray-700">{Order.description}</p>
        </div>
        <div className="mb-2 flex justify-between">
          <p className="font-bold text-lg">Start Time:</p>
          <p className="text-gray-700">{Order.startTime}</p>
        </div>
        <div className="mb-2 flex justify-between">
          <p className="font-bold text-lg">End Time:</p>
          <p className="text-gray-700">{Order.endTime}</p>
        </div>
        <div className="mb-2 flex justify-between">
          <p className="font-bold text-lg">Customer Name:</p>
          <p className="text-gray-700">{store.getState().user.value.firstName}</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="font-bold text-lg">Total</p>
          <div>
            <p className="mb-1 font-bold text-lg">
              500 Rs
            </p>
          </div>
        </div>
        <button
          className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
          onClick={() =>
            displayRazorPay(100)
          }
        >
          Book Service
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default Cart;