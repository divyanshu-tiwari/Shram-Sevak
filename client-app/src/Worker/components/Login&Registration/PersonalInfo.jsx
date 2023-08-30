import React, { useState } from 'react';
import "./Style.css";

function SignUpInfo({ formData,setFormData }) {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let validationErrors = {};
    
    if (formData.firstName.length < 2 || formData.firstName.length > 15) {
      validationErrors.firstName = "First name should be between 2 and 15 characters";
    }
    
    if (formData.lastName.length < 2 || formData.lastName.length > 15) {
      validationErrors.lastName = "Last name should be between 2 and 15 characters";
    }
    
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
      validationErrors.email = "Invalid email address";
    }
    
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    const minAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const maxAge = new Date(today.getFullYear() - 70, today.getMonth(), today.getDate());
    
    if (birthDate < minAge || birthDate > maxAge) {
      validationErrors.dateOfBirth = "You must be between 18 and 70 years old";
    }else{
      validationErrors.dateOfBirth = "";

    }    
    setErrors(validationErrors);
    
    return Object.keys(validationErrors).length === 0;
  };

  return (
    <div className="sign-up-containers">
      
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(event) => {
            const firstName = event.target.value;
            setFormData({ ...formData, firstName });
            validateForm();
          }}
          className="custom-input"
        />
        {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(event) => {
            const lastName = event.target.value;
            setFormData({ ...formData, lastName });
            validateForm();
          }}
          className="custom-input"
        />
        {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(event) => {
            const email = event.target.value;
            setFormData({ ...formData, email });
            validateForm();
          }}
          className="custom-input"
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
        
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={formData.dateOfBirth}
          onChange={(event) => {
            const dateOfBirth = event.target.value;
            setFormData({ ...formData, dateOfBirth });
            validateForm();
          }}
          className="custom-input"
        />
        {errors.dateOfBirth && <p className="error-message">{errors.dateOfBirth}</p>}

    </div>
  );
}

export default SignUpInfo;
