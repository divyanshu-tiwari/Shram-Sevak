import { useEffect, useState } from "react"
import AdminUser from "../../utils/models/admin.user"
import { Role } from "../../utils/models/role";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setCurrentUser, clearCurrentUser, selectUser } from "../../utils/store/user/userSlice";
import { getUserRole } from "../../utils/service/base.service";
import AdminService from "../../utils/service/admin.service";

export const AdminLogin = () => {

  // Get current user
  const currentUser = useSelector((state) => state.user)

  // To handle form submission
  const [submitted, setSubmitted] = useState(false)
  // To handle page reload
  const [loaded, setLoaded] = useState(false)
  // To handle error messages
  const [errorMessage, setErrorMessage] = useState("")


  // For navigation
  const navigate = useNavigate()
  // For dispatching
  const dispatch = useDispatch()


  // Check if admin is already logged-in at mounting time
  useEffect(() => {
    if (currentUser?.id)
      navigate("/admin-dashboard")
  }, [])


  // To handle form data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsernameChange(value) {
    setUsername(value);
  }

  function handlePasswordChange(value) {
    setPassword(value);
  }


  // To handle Login
  function handleLogin(event) {
    event.preventDefault()

    if (!username || !password) {
      return;
    }

    // Code for plugging axios
    
    const adminCredentials = { userName: username, password: password }
    setSubmitted(true)
    AdminService.signin(adminCredentials)
    .then(response => {
      console.log("Successful login : " + response.data)
      // need to provide dummy token when web-service is not re
      dispatch(setCurrentUser({...response.data, role: Role.ADMIN, token:12}))
      if (getUserRole() === Role.ADMIN)
        navigate('/admin-dashboard')
    })
    .catch(error => {
      console.log(error)
      setErrorMessage('invalid login credentials')
      setLoaded(false)
    })
    
  }


  return (
    <form
      onSubmit={(event) => handleLogin(event)}
    >
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
                  onChange={(event) => handlePasswordChange(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Login
        </button>
      </div>
    </form>
  )
}
