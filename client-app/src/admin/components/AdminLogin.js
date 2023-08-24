import { useState } from "react"

export default function AdminLogin() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsernameChange(value){
    setUsername(value);
  }
  
  function handlePasswordChange(value){
    setPassword(value);
  }

  function handleLogin(){
    let adminCredentials = {username, password}
    alert(adminCredentials.username+" "+adminCredentials.password)
    // make axios call
    // service.AdminLogin(adminCredentials)
    // have to save the JWT token returned by webservice
  }

  return (
    // check how to handle form submission, for now keeping the button type to button rather than submit
    // <form action="localhost:3000" method="POST">
    <form>
      <div className="space-y-12">
        
          <h2 className="mt-6 text-base font-semibold leading-7 text-gray-900">Admin Login</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-8">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">shramsevak.com/</span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="admin1"
                    value={username}
                    onChange={(event) => handleUsernameChange(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-8">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={password}
                    onChange={(event)=>handlePasswordChange(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
      </div>

      <div className="mt-3 flex items-center justify-end">
        <button
          // type="submit"
          type="button"
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </form>
  )
}
