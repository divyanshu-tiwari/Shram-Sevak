import React from "react";
import "./Style.css"

function AddressInfo({ formData, setFormData,errorMessages }) {
  return (
    <div className="other-info-container">
      <input
        type="text"
        placeholder="Lane_1"
        value={formData.Lane_1}
        onChange={(e) => {
          setFormData({ ...formData, Lane_1: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Lane_2"
        value={formData.Lane_2}
        onChange={(e) => {
          setFormData({ ...formData, Lane_2: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Lane_3"
        value={formData.Lane_3}
        onChange={(e) => {
          setFormData({ ...formData, Lane_3: e.target.value });
        }}
      />
      <input
        type="number"
        placeholder="Pincode.."
        value={formData.Pincode}
        onChange={(e) => {
          setFormData({ ...formData, Pincode: e.target.value });
        }}
      />
           {errorMessages.Pincode && <p className="error-message">{errorMessages.Pincode}</p>}
  
    </div>
  );
}

export default AddressInfo;
