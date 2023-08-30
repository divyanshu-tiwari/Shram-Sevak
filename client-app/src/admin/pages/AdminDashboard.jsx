import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { CustomerBoard } from './admin.customer.board'
import store from '../../utils/store/store'
import { current } from '@reduxjs/toolkit'
import { AdminProfile } from './admin.profile'
import { AdminSignout } from './admin.signout'
import { AdminDashboardHome } from './admin.dashboard.home'
import { WorkerBoard } from './admin.worker.dashboard'
import { CategoryTable } from './categoryViews/category.table'
import { SkillTable } from './skillViews/skill.table'
import { StateTable } from './stateViews/state.table'
import { LocalityTable } from './localityViews/locality.table'
import { CityTable } from './cityViews/city.table'
import { useDispatch } from 'react-redux'
import { clearCurrentUser } from '../../utils/store/user/userSlice'
import { useSelector } from 'react-redux'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Customers', href: '/customers', current: false },
  { name: 'Workers', href: '/workers', current: false },
  { name: 'Categories', href: '/categories', current: false },
  { name: 'Skills', href: '/skills', current: false },
  { name: 'States', href: '/states', current: false },
  { name: 'Cities', href: '/cities', current: false },
  { name: 'Localities', href: '/localities', current: false },
]

const userNavigation = [
  { name: 'Sign out', href: '/signout' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminDashboard() {
  const user = useSelector((state) => state.user?.value.userName)
  // alert(navigation)

  const [currentPage, setCurrentPage] = useState({name:'Dashboard', href:'/dashboard', current:true})
  const dispatch = useDispatch()
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Shram Sevak"
                      />
                    </div>
                    {/* Nav-bar items */}
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            onClick = {() => {
                              navigation.find((navItem) => navItem.current === true).current = false;
                              navigation.find((navItem) => navItem === item).current = true;
                              setCurrentPage({name: item.name, href: item.href})
                            }}
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
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <div className="flex items-center px-5">
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white">{user.name}</div>
                        </div>
                      </div>
                      {/* menu */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative border-none rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                            </svg>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a             
                                    onClick={() => {
                                      dispatch(clearCurrentUser())
                                    }}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      onClick = {() => {
                        navigation.find((navItem) => navItem.current === true).current = false;
                        navigation.find((navItem) => navItem === item).current = true;
                        setCurrentPage({name: item.name, href: item.href})
                      }}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        onClick={() => {
                          setCurrentPage({name: item.name, href: item.href})
                        }}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{currentPage.name}</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

                {currentPage.href === '/dashboard' && <AdminDashboardHome />} 
                {currentPage.href === '/customers' && <CustomerBoard /> }
                {currentPage.href === '/workers' && <WorkerBoard /> }
                {currentPage.href === '/categories' && <CategoryTable />}
                {currentPage.href === '/skills' && <SkillTable />}
                {currentPage.href === '/states' && <StateTable />}
                {currentPage.href === '/cities' && <CityTable />}
                {currentPage.href === '/localities' && <LocalityTable />}
                {currentPage.href === '/admin-profile' && <AdminProfile />}
                {currentPage.href === '/signout' && <AdminSignout />}

          </div>
        </main>
      </div>
    </>
  )
}
