import React from "react";
import "./Style.css"

function PersonalInfo({ formData, setFormData }) {
  return (
    <div className="personal-info-container">
      <input
        type="text"
        placeholder="First Name..."
        value={formData.firstName}
        onChange={(e) => {
          setFormData({ ...formData, firstName: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Last Name..."
        value={formData.lastName}
        onChange={(e) => {
          setFormData({ ...formData, lastName: e.target.value });
        }}
      />
           <select
            value={formData.gender}
            onChange={(e) => {
              setFormData({ ...formData, gender: e.target.value });
            }}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

    </div>
  );
}

export default PersonalInfo;
