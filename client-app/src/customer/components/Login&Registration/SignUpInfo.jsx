import React, { useState } from 'react';
import "./Style.css";

function SignUpInfo({ formData, setFormData }) {
  const [contactError, setContactError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateContact = (value) => {
    if (!value) {
      setContactError("Contact number is required");
    } else if (!/^\d{10}$/.test(value)) {
      setContactError("Contact number should be 10 digits");
    } else {
      setContactError("");
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (value) => {
    if (!value) {
      setConfirmPasswordError("Confirm password is required");
    } else if (value !== formData.password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleContactChange = (event) => {
    const value = event.target.value;
    setFormData({ ...formData, contact: value });
    validateContact(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setFormData({ ...formData, password: value });
    validatePassword(value);
    validateConfirmPassword(formData.confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setFormData({ ...formData, confirmPassword: value });
    validateConfirmPassword(value);
  };

  const handleSubmit = () => {
    validateContact(formData.contact);
    validatePassword(formData.password);
    validateConfirmPassword(formData.confirmPassword);

  };

  return (
    <div className="sign-up-containers">
      <input
        type="contact"
        name="contact"
        placeholder="Phon No."
        value={formData.contact}
        onChange={handleContactChange}
        className="custom-input"
      />
      {contactError && <div className="error-message">{contactError}</div>}

      <input
        type="password"
        id="pass"
        name="pass"
        placeholder="Password"
        value={formData.password}
        onChange={handlePasswordChange}
        className="custom-input"
      />
      {passwordError && <div className="error-message">{passwordError}</div>}

      <input
        type="password"
        id="confpass"
        name="confpass"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleConfirmPasswordChange}
        className="custom-input"
      />
      {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
    </div>
  );
}

export default SignUpInfo;