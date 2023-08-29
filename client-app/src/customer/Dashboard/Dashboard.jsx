import React, { useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/outline';
import { worker_list } from '../../Data/worker_list'
import axios from 'axios';
import HomeSectionCarousel from '../components/HomeSectionCarousel/HomeSectionCarousel';
import ChooseSkillAndWorkers from './ChooseSkillAndWorkers';
import store from "../../utils/store/store";
import { useNavigate } from "react-router-dom";
const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Home', href: '/', current: false },
  { name: 'Your Orders', href: '/customer/orderdetails', current: false },
 
  { name: 'Profile Info', href: '#', current: false },
];

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dashboard() {
  const navigate = useNavigate();
  const[customer,setCustomer]=useState(null);
  const handleSubmit=()=>{
    alert("ok");
    axios.get(`http://localhost:8080/customer/getCustomer/${store.getState().user.value.id}`).then((response)=>{
      setCustomer(response.data)
    }).catch((error)=>{
      alert("error");
      console.log("error occured");
    })
  }
  return (
    <div className="min-h-screen bg-gray-100">
     <Disclosure as="nav" className="bg-gray-800">
  {({ open }) => (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-8 w-8"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* "Sign Out" button */}
        <div className="hidden md:block">
          <a
            href="#" // Replace with your sign-out endpoint or logic
            onClick={()=>{
              navigate("/SignOut");


            }}
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Sign Out
          </a>
        </div>
      </div>
    </div>
  )}
</Disclosure>


      {/* Rest of the code for mobile menu and user profile dropdown */}
      
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome Back {store.getState().user.value.firstName} </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/* Your content */}</div>
      </main>

     <div  className="space-y-4">
      <div className="flex space-x-80">
  <div>
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div  className='h-[20rem] w-[20rem]'>
      <img className="object-cover object-top w-full h-full" 
      
      src="https://i.pinimg.com/564x/63/5a/70/635a70b0d7c58ab0b30082125978c245.jpg" alt="Sunset in the mountains" />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Profile:-</div>
        <p className="text-gray-700 text-base">
          <div>
            {customer ? (
              <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-white">
                <p>Name: {store.getState().user.value.firstName}{'   '}{store.getState().user.value.lastName}</p>
                <p>Email: {customer.email}</p>
                <p>Contact: {store.getState().user.value.contact}</p>
                <p>Gender: {store.getState().user.value.gender}</p>
                <p>Status: {customer.status}</p>
                {/* Add additional worker details here */}
              </div>
            ) : (
              <p>Click Button to see profile</p>
            )}
          </div>
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleSubmit}>
          Button
        </button>
      </div>
    </div>
  </div>
  <div className="flex items-center justify-center  bg-white">
   <div className="bg-white p-4">
      <ChooseSkillAndWorkers></ChooseSkillAndWorkers>
   </div>
</div>
</div>
<HomeSectionCarousel data={worker_list} sectionName={"Popular Services"}/>
    </div>
    </div>
    
    
    
  );
}