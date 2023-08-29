import React, { useEffect,useState } from 'react';
import axios from 'axios';
import SignUpInfo from "./SignUpInfo"
import PersonalInfo from "./PersonalInfo"
import AddressInfo from "./AddressInfo"
import './Style.css';
import Navigation from '../navigation/Navigation';

import { Password } from '@mui/icons-material';

import CustomerService from "../../../utils/service/customer.service"
import { Role } from '../../../utils/models/role';
import { setCurrentUser } from "../../../utils/store/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Form = ({showNavbar=true}) => {
    const [page, setPage] = useState(0);
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState({
      contact: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      dateOfBirth:"",
      gender: "",
      Lane_1:"",
      Lane_2:"",
      Lane_3:"",
      Pincode:"",
    });

    
    const [formData , setFormData] = useState({
      contact: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      dateOfBirth:"",
      gender: "MALE",
      Lane_1:"",
      Lane_2:"",
      Lane_3:"",
      Pincode:"",
    });
   
  
    const FormTitles = ["Sign Up", "Personal Info", "Address Info"];
    const PageDisplay = () => {
      if (page === 0) {
        return <SignUpInfo formData={formData} setFormData={setFormData} errorMessages={errorMessages}/>;
      } else if (page === 1) {
        return <PersonalInfo formData={formData} setFormData={setFormData} errorMessages={errorMessages} />;
      } else {
        return <AddressInfo formData={formData} setFormData={setFormData} errorMessages={errorMessages}/>;
      }
    };
    
  // Validation functions for each field
  const isPhoneValid = () => formData.contact !== "" && formData.contact !==undefined && formData.contact.length===10;
  const isPasswordValid = () => formData.password !== "" && formData.password === formData.confirmPassword  
                                && formData.password.length >= 4 && formData.password !==undefined;
  const isFirstNameValid = () => formData.firstName !== "";
  const isLastNameValid = () => formData.lastName !== "";
  const isPincodeValid = () => formData.Pincode !== "" && formData.Pincode === 6;
  const isDOBValid =()=>{
    const currentDate = new Date();
    const enteredDOB = new Date(formData.dateOfBirth);
    const timeDifference = currentDate - enteredDOB;
  
    // Calculate the age based on milliseconds in a year (365 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    const age = timeDifference / (365 * 24 * 60 * 60 * 1000);
  
    return age >= 18;
  }
  


  const singInPageValid = () => {
    if (page === 0) {
        if(!isPhoneValid()){

          setErrorMessages((prevMessages) => ({
            ...prevMessages,
            contact: 'Enter a valid Phone No. (It should be 10 digits)',
          }));
        }else
        if(!isPasswordValid()){
          setErrorMessages((prevMessages) => ({
            ...prevMessages,
            password: 'Incorrect Password (Password Should be at least 4 Digits)',
          }));
        }else {
            return true;
        }
    }
    return false;
  };


 // Validation function for the current page
 const isPageValid = () => {
  if (page === 0) {
    if (!isPhoneValid()) {
      setErrorMessages((prevMessages) => ({
        ...prevMessages,
        contact: 'Invalid Fhon Number',
      }));
    } else  if (!isPasswordValid()) {
          setErrorMessages((prevMessages) => ({
            ...prevMessages,
            password: 'Incorrect Password (at least 4 Digits)',
          }));

        } else {
          
          setErrorMessages((prevMessages) => ({
            ...prevMessages,
            password: '', // Clear error message if valid
          }));    
          setErrorMessages((prevMessages) => ({
            ...prevMessages,
            contact: '', // Clear error message if valid
          }));    
          return true;
        }
      } else if (page === 1) {
        if (!isFirstNameValid()) {
          setErrorMessages((prevMessages) => ({
            ...prevMessages,
            firstName: 'Enter First Name',
          }));
      
        } else if (!isLastNameValid()) {
          setErrorMessages((prevMessages) => ({
            ...prevMessages,
            lastName: 'Enter Last Name',
          }));
        } else if (!isDOBValid()) {
          setErrorMessages((prevMessages) => ({
            ...prevMessages,
            dateOfBirth: 'Minimum Age Should be 18',
             }));
       
        } else {
          setErrorMessages((prevMessages) => ({
            ...prevMessages,
            firstName: '', // Clear error message if valid
          }));           
           setErrorMessages((prevMessages) => ({
            ...prevMessages,
            lastName: '', // Clear error message if valid
          }));  

          setErrorMessages((prevMessages) => ({
            ...prevMessages,
            dateOfBirth: '', // Clear error message if valid
          }));  
        return true;
        }
      } 
      
      return false;
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


  
const dispatch = useDispatch()


return (
    <>
      { showNavbar && <Navigation />}
      <div className="flex justify-center items-center p-10">
      <div className="container " id="container">
          <div className="form-container sign-up-container">
            <form action="#"  target="_self" >
          
          
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

                                  // if (isPageValid()) { // Check if the current page's data is valid


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

                                            // } else {
                            
                                            //   console.log('Invalid DATA');
                                            // }
                                        }}

                                            
                                        

                                >
                                {page === FormTitles.length - 1 ? "Submit" : "Next"}
                            </button>

                    </div>             
            </form>
        </div>

        {/* <!-- Sign In --> */}
        <div className="form-container sign-in-container">
          <form action="#"  target="_self">
            <h1 className='p-5'>Sign In</h1>
            
            <input 
                    type="contact" 
                    id='contact'
                    name="contact" 
                    placeholder="Phon No."
                    value={formData.contact} 
                    onChange={(event) =>
                      setFormData({ ...formData, contact: event.target.value })}
                    />
            <input 
                    type="password" 
                    id='pass'
                    name="pass" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={(event) =>
                    setFormData({ ...formData, password: event.target.value })}       
            />
            <a href="#">Forgot your password?</a>
            <button
                    type='submit' 
                    id ="sub"

                    name="sub" 
                     onClick = {() => {
                       CustomerService.signin({contact:formData.contact,password:formData.password})
                       .then(response => {
                          console.log("Successful login : " + response.data)
                          // need to provide dummy token when web-service is not re
                        dispatch(setCurrentUser({...response.data, role: Role.CUSTOMER, token:12}))
                        navigate("/dashboardC");
                        })
                      }
                     }
                  //  onClick={async () => {
                  //           try {
                  //               const response = await axios.post("localhost:8080/customer/sigin")
                  //               if (response.status === 200) {
                  //                   console.log(response.data); 
                  //               } else {
                  //                   alert('Failed to submit form.');
                  //               }
                  //               } catch (error) {
                  //               alert('An error occurred while submitting the form.');
                  //               console.error(error);
                  //           }
                  //       } 
                  //   }
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
