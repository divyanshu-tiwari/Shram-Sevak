import React from "react";
import "./Style.css"

function PersonalInfo({ formData, setFormData ,errorMessages }) {
  return (
    <div className="personal-info-container">
      <input
        type="text"
        placeholder="First Name..."
        value={formData.firstName}
        rules={{
          required: true,
        }}
        // error ={true}
        onChange={(e) => {
          setFormData({ ...formData, firstName: e.target.value });
        }}
      />
        {errorMessages.firstName && <p className="error-message">{errorMessages.firstName}</p>}

      <input
        type="text"
        placeholder="Last Name..."
        value={formData.lastName}
        onChange={(e) => {
          setFormData({ ...formData, lastName: e.target.value });
        }}
      />
        {errorMessages.lastName && <p className="error-message">{errorMessages.lastName}</p>}

        <input
        type="date"
        placeholder="Date of Birth..."
        value={formData.dateOfBirth}
        onChange={(e) => {
          setFormData({ ...formData, dateOfBirth: e.target.value });
        }}
      />
        {errorMessages.dateOfBirth && <p className="error-message">{errorMessages.dateOfBirth}</p>}

           <select
            value={formData.gender}
            onChange={(e) => {
              setFormData({ ...formData, gender: e.target.value });
            }}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>

    </div>
  );
}

export default PersonalInfo;
