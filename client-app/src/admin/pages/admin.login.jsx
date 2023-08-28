import React,{ useEffect, useState } from "react"
import "../style/adminLogin.css"
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



  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
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
  };

  return (
    <div className="login-container">
      <form onSubmit ={(event)=>handleSubmit(event)} className="login-form" >
        <h2 className="login-title">Admin Login</h2>
        <div className="input-container">
        <label htmlFor="username" className="input-label">
            Username
          </label>
          {/* <span className="flex ">shramsevak.com/</span> */}
          <input
            type="text"
            id="username"
            placeholder="admin1"
            autoComplete="username"
            value={username}
            onChange={handleUsernameChange}
            className="input-field"
          />
        </div>
        <div className="input-container">
        <label htmlFor="password" className="input-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="input-field"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}
export default AdminLogin;
