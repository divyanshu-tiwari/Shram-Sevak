import React, { useEffect,useState } from 'react';
import axios from 'axios';
import SignUpInfo from "./SignUpInfo"
import PersonalInfo from "./PersonalInfo"
import AddressInfo from "./AddressInfo"
import './Style.css';
import Navigation from '../navigation/Navigation';


const Form = ({showNavbar=true}) => {
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
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
   
  
    const FormTitles = ["Sign Up", "Personal Info", "Address Info"];
    const PageDisplay = () => {
      if (page === 0) {
        return <SignUpInfo formData={formData} setFormData={setFormData} />;
      } else if (page === 1) {
        return <PersonalInfo formData={formData} setFormData={setFormData} />;
      } else {
        return <AddressInfo formData={formData} setFormData={setFormData} />;
      }
    };
    
  // Validation functions for each field
  const isPhoneValid = () => formData.contact !== "" && formData.contact !==undefined && formData.contact.length===10;
  const isPasswordValid = () => formData.password !== "" && formData.password === formData.confirmPassword  
                                                         && formData.password.length >= 4 && formData.password !==undefined;
  const isFirstNameValid = () => formData.firstName !== "";
  const isLastNameValid = () => formData.lastName !== "";
  const isDOBValid =()=>{
    const currentDate = new Date();
    const enteredDOB = new Date(formData.dateOfBirth);
    const timeDifference = currentDate - enteredDOB;
  
    // Calculate the age based on milliseconds in a year (365 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    const age = timeDifference / (365 * 24 * 60 * 60 * 1000);
  
    return age >= 18;
  }
  // Define other validation functions for each field


  const singInPageValid = () => {
    if (page === 0) {
        if(!isPhoneValid()){
            alert("Enter Currect Moble No.( It Should be 10 Digit )")
        }
        else if(!isPasswordValid()){
            alert("Incorrect Currect Password ( Password Should be min 4 Digit )")
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
          alert("Enter Correct Mobile No. (It Should be 10 Digits)");
        } else if (!isPasswordValid()) {
          alert("Incorrect Password (Password Should be at least 4 Digits)");
        } else {
          return true;
        }
      } else if (page === 1) {
        if (!isFirstNameValid()) {
          alert("Enter First Name");
        } else if (!isLastNameValid()) {
          alert("Enter Last Name");
        } else if (!isDOBValid()) {
            alert("Minimum Age Should be 18");
          } else {
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
                                        if (isPageValid()) { // Check if the current page's data is valid
                                            if (page === FormTitles.length - 1) {
                                                try {
                                                    console.log(formData.gender + "Is selected Gender");
                                                    const response = await axios.post('http://localhost:8080/customer/register', formData);
                                                    if (response.status === 200) {
                                                        alert('Form submitted successfully!');
                                                        console.log(response.data); // Assuming the backend sends a response
                                                    } else {
                                                        alert('Failed to submit form.');
                                                    }
                                                    } catch (error) {
                                                    alert('An error occurred while submitting the form.');
                                                    alert(formData.gender);
                                                    console.error(error);
                                                    
                                                    }
                                                } else {
                                                    setPage((currPage) => currPage + 1);
                                                }
                                            } else {
                                            alert('Please fill in all required fields and ensure that the data is valid.');
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
          <form action="#"  target="_self">
            <h1>Sign in</h1>
            <div className="social-container">          
                <a href="#" className="social">
                    <i className="fab fa-google-plus-g" />
                </a>           
            </div>
            <span>or use your account</span>
            <input 
                    type="contact" 
                    id='contact'
                    name="contact" 
                    placeholder="Phon No."
                    value={formData.contact} 
                    onChange={(event) =>setFormData({ ...formData, contact: event.target.value })}  
                    
                    />
            <input 
                    type="password" 
                    id='pass'
                    name="pass" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={(event) =>setFormData({ ...formData, password: event.target.value })}            
            />

            <input 
                    type="password" 
                    id='confpass'
                    name="confpass" 
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(event) =>setFormData({ ...formData, confirmPassword: event.target.value })}
            />
            <a href="#">Forgot your password?</a>
            <button
                    type='submit' 
                    id ="sub" 
                    name="sub" 
                    onClick={async () => {
                        if (singInPageValid()) { // Check if the current page's data is valid
                            try {
                                const response = await axios.post('YOUR_BACKEND_API_ENDPOINT', formData);
                                if (response.status === 200) {
                                    alert('Form submitted successfully!');
                                    console.log(response.data); // Assuming the backend sends a response
                                } else {
                                    alert('Failed to submit form.');
                                }
                                } catch (error) {
                                alert('An error occurred while submitting the form.');
                                console.error(error);
                            }
                        } 
                    }}
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
