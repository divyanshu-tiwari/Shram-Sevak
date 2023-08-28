import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
          alert(JSON.stringify(response.razorpay_payment_id))
          axios.put(`localhost:8080/order/{orderId}`, {id: response.razorpay_payment_id, status: "SUCCESS"})
          // Redirect or navigate to a success page
          navigate("/");
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
      <div class="h-screen bg-gray-100 pt-20">
        <h1 class="mb-10 text-center text-2xl font-bold">Service Information</h1>
        <div className="mx-auto justify-center xl:px-0" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div class="rounded-lg">
           
          </div>

          <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div class="mb-2 flex justify-between">
    <p class="text-gray-700">Title</p>
  <p class="text-gray-700">${Order.title}</p>
  </div>
  <div class="mb-2 flex justify-between">
 
    <p class="text-gray-700">${Order.title}</p>
    <p class="text-gray-700"></p>

  </div>

  <div class="mb-2 flex justify-between">
    <p class="text-gray-700">Start Time</p>
    <p class="text-gray-700">hii</p>
  </div>

  <div class="mb-2 flex justify-between">
    <p class="text-gray-700">End Time</p>
    <p class="text-gray-700">hii</p>
  </div>

  <div class="mb-2 flex justify-between">
    <p class="text-gray-700">Customer ID</p>
    <p class="text-gray-700">Subhash</p>
  </div>

  <div class="mb-2 flex justify-between">
    <p class="text-gray-700">Worker ID</p>
    <p class="text-gray-700">neeta</p>
  </div>

            <hr class="my-4" />
            <div class="flex justify-between">
              <p class="text-lg font-bold">Total</p>
              <div class="">
                <p class="mb-1 text-lg font-bold">
                  500 Rs
                </p>
               
              </div>
            </div>
            <button
              class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
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