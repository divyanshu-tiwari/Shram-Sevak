import React, { useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/outline';

import axios from 'axios';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
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

  const[worker,setWorker]=useState(null);
  const handleSubmit=()=>{
    alert("ok");
    axios.get(`http://localhost:8080/worker/getWorker/2`).then((response)=>{
      setWorker(response.data)
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
              {/* Rest of the code for notifications and user profile */}
            </div>
          </div>
        )}
      </Disclosure>

      {/* Rest of the code for mobile menu and user profile dropdown */}
      
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/* Your content */}</div>
      </main>

      <div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src="/https://www.google.com/url?sa=i&url=https%3A%2F%2Felearningindustry.com%2Fonline-training-for-remote-workers-why&psig=AOvVaw3iAtzpipZ_zhyzefuRhnmb&ust=1693147979128000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIC0svDJ-oADFQAAAAAdAAAAABAE/card-top.jpg" alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Profile:-</div>
        <p className="text-gray-700 text-base">
        <div>
  {worker ? (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-white">
      <p>Name: {worker.firstName} {worker.lastName}</p>
      <p>Email: {worker.email}</p>
      <p>Contact: {worker.contact}</p>
      <p>Gender:{worker.gender}</p>
      <p>Status :{worker.status}</p>
      {/* Add additional worker details here */}
    </div>
  ) : (
    <p>Click Button to see profile</p>
  )}
</div>
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleSubmit}>
  Button
        </button>
        
      </div>
    </div>
      </div>
    </div>
    
    
  );
}
