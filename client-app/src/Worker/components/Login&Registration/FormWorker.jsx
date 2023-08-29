import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SignUpInfo from "./SignUpInfo"
import PersonalInfo from "./PersonalInfo"
import './Style.css';
import ChooseWorkingLocation from './ChooseWorkingLocation';
import Navigation from '../../../customer/components/navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import { Role } from '../../../utils/models/role';
import { setCurrentUser } from '../../../utils/store/user/userSlice';
import { useDispatch } from 'react-redux';
import { getUserRole } from '../../../utils/service/base.service';



const Form = ({ showNavbar = true }) => {
  const [page, setPage] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [contactError, setContactError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    gender: "MALE",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    profilePicturePath: "path/to/profile/picture.jpg",
    localityId: "",
    pincode: ""
  });

  //Handle Worker Sign-In
  function handleLogin(event) {
    event.preventDefault();

    if (!isPhoneValid()) {
      setContactError("Invalid Phone Number");
    }
    else if(!isPasswordValid()){
      setPasswordError("Invalid Password");
    } else {
      setContactError("");
      setPasswordError("");
      axios.post('http://localhost:8080/worker/signin', formData)
        .then(response => {
          console.log("Successful login : " + response.data)
          // need to provide dummy token when web-service is not returning it.
          dispatch(setCurrentUser({ ...response.data, role: Role.WORKER, token: 15 }))
          if (getUserRole() === Role.WORKER)
            navigate('/worker-dashboard')
        })
        .catch(error => {
          console.log(error)
          setErrorMessage('Invalid login credentials')
          alert(errorMessage)
        })
    }
  }

  //Setting Pages Flow for Sign In and Sign-Up
  const FormTitles = ["Sign Up", "Personal Info", "Choose Your Working Location"];
  const PageDisplay = () => {
    if (page === 0) {
      return <SignUpInfo formData={formData} setFormData={setFormData} errorMessages={errorMessage} />;
    } else if (page === 1) {
      return <PersonalInfo formData={formData} setFormData={setFormData} errorMessages={errorMessage} />;
    } else if (page === 2) {
      return <ChooseWorkingLocation formData={formData} setFormData={setFormData} errorMessages={errorMessage} />;
    }
  };

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    const handleSignUpClick = () => {
      container.classList.add('right-panel-active');
    };

    const handleSignInClick = () => {
      container.classList.remove('right-panel-active');
    };

    signUpButton.addEventListener('click', handleSignUpClick);
    signInButton.addEventListener('click', handleSignInClick);

    return () => {
      signUpButton.removeEventListener('click', handleSignUpClick);
      signInButton.removeEventListener('click', handleSignUpClick);
    };
  }, []);


//contact and password validation
  const isPhoneValid = () => {
    return formData.contact !== "" && formData.contact !== undefined && /^[0-9]{10}$/.test(formData.contact);
  };

  const isPasswordValid = () => {
    return formData.password !== "" && formData.password.length >= 4;
  };

  return (
    <>
      {showNavbar && <Navigation />}
      <div className="flex justify-center items-center p-10">
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form action="#" target="_self">
              {/* <!-- Sign Up --> */}
              <h1>{FormTitles[page]}</h1><br></br>
              <div className="progressbar">
                <div style={{ width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%" }}></div>
              </div>
              <div className="body">{PageDisplay()}</div>
              <div className="footer">
                <button
                  className='text-white'
                  id='back'
                  disabled={page === 0}
                  onClick={() => {
                    setPage((currPage) => currPage - 1);
                  }}
                >
                  Back
                </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  id='next'
                  type={page === FormTitles.length - 1 ? "submit" : "button"}
                  onClick={async (event) => {
                    event.preventDefault()
                    console.log(JSON.stringify(formData))
                    if (page === FormTitles.length - 1) {
                      try {
                        const response = await axios.post('http://localhost:8080/worker/register', formData);
                        if (response.status === 201) {
                          console.log('Worker Registered successfully!');
                          navigate('/chooseskills', { state: response.data.id });
                        } else {
                          console.error("Failed to submit form.")
                        }
                      } catch (error) {
                        console.error('An error occurred while submitting the form.');
                        console.error(error);
                      }
                    } else {
                      setPage((currPage) => currPage + 1);
                    }
                  }}
                >
                  {page === FormTitles.length - 1 ? "Submit" : "Next"}
                </button>
              </div>
            </form>
          </div>
          {/* <!-- Sign In --> */}
          <div className="form-container sign-in-container">
            <form action="#" target="_self" onSubmit={(event) => handleLogin(event)}>
              <h1 className='p-5'>Sign in</h1>
              <input
                type="contact"
                id='contact'
                name="contact"
                placeholder="Phone No."
                value={formData.contact}
                onChange={(event) => {
                  setFormData({ ...formData, contact: event.target.value });
                  setContactError(""); // Clear the error message when input changes
                }}
              />
              {contactError && <p className="text-red-700">{contactError}</p>}
              <input
                type="password"
                id='pass'
                name="pass"
                placeholder="Password"
                value={formData.password}
                onChange={(event) => {
                  setFormData({ ...formData, password: event.target.value });
                  setPasswordError(""); // Clear the error message when input changes
                }}
              />
              {passwordError && <p className="text-red-700">{passwordError}</p>}
              <button
                type='submit'
                id="sub"
                name="sub"
              >Sign In</button>
            </form>
          </div>
          {/* <!-- This div use for Animation --> */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost text-white" id="signIn">Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Dear, Worker!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost text-white" id="signUp"> Create Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Form;