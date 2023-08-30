import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SignUpInfo from "./SignUpInfo"
import PersonalInfo from "./PersonalInfo"
import AddressInfo from "./AddressInfo"
import './Style.css';
import Navigation from '../navigation/Navigation';
import CustomerService from "../../../utils/service/customer.service"
import { Role } from '../../../utils/models/role';
import { setCurrentUser } from "../../../utils/store/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Form = ({ showNavbar = true }) => {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [errorMessages, setErrorMessage] = useState("");
  const [contactError, setContactError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch()




  const [formData, setFormData] = useState({
    contact: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "MALE",
    Lane_1: "",
    Lane_2: "",
    Lane_3: "",
    Pincode: "",
  });


  const FormTitles = ["Sign Up", "Personal Info", "Address Info"];
  const PageDisplay = () => {
    if (page === 0) {
      return <SignUpInfo formData={formData} setFormData={setFormData} errorMessages={errorMessages} />;
    } else if (page === 1) {
      return <PersonalInfo formData={formData} setFormData={setFormData} errorMessages={errorMessages} />;
    } else {
      return <AddressInfo formData={formData} setFormData={setFormData} errorMessages={errorMessages} />;
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
        <div className="container " id="container">
          <div className="form-container sign-up-container">
            <form action="#" target="_self" >


              {/* <!-- Sign Up --> */}
              <h1>{FormTitles[page]}</h1><br></br>

              <div className="progressbar">
                <div style={{ width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%" }} ></div>
              </div>

              <div className="body">{PageDisplay()}</div>

              <div className="footer">
                <button
                  className='text-white'
                  id='back'
                  disabled={page == 0}
                  onClick={() => {
                    setPage((currPage) => currPage - 1);
                  }}
                >
                  Back
                </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  id='next'
                  type={page === FormTitles.length - 1 ? "submit" : "button"}
                  onClick={async () => {

                    if (page === FormTitles.length - 1) {
                      try {
                        console.log(formData.gender + "Is selected Gender");
                        const response = await axios.post('http://localhost:8080/customer/register', formData);
                        if (response.status === 200) {
                          console.log(response.data);
                          console.log("Sign in successful");
                          navigate('/CustomerRegistrationSuccess')
                        } else {
                          console.log('Failed to sign in.');
                        }
                      } catch (error) {

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
            <form action="#" target="_self">
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
                onClick={(e) => {
                  e.preventDefault();
                  if (!isPhoneValid()) {
                    setContactError("Invalid Phone Number");
                  }
                  else if (!isPasswordValid()) {
                    setPasswordError("Invalid Password");
                  } else {

                    CustomerService.signin({ contact: formData.contact, password: formData.password })
                      .then(response => {
                        console.log("Successful login : " + response.data)
                        // need to provide dummy token when web-service is not re
                        dispatch(setCurrentUser({ ...response.data, role: Role.CUSTOMER, token: 12 }))
                        navigate("/dashboardC");
                      })
                  }
                }
                }
              >Sign In</button>
            </form>
          </div>


          {/* <!-- This div use for Animation --> */}
          <div className="overlay-container ">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost text-white" id="signIn">Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Dear, Customer!</h1>
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
