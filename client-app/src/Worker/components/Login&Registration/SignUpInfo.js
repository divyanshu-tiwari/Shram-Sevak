import React from 'react'
import "./Style.css"

function SignUpInfo({ formData, setFormData }) {
  return (
    <div className="sign-up-containers">
    
      {/* Inside your SignUpInfo, PersonalInfo, and OtherInfo components */}
              <input
                type="contact"
                name="contact"
                
                placeholder="Phon No."
                value={formData.contact}
                onChange={(event) => setFormData({ ...formData, contact: event.target.value })}
                className="custom-input"
              />

              <input
                type="password"
                id="pass"
                name="pass"
                placeholder="Password"
                value={formData.password}
                onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                className="custom-input"
              />

              <input
                type="password"
                id="confpass"
                name="confpass"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(event) => setFormData({ ...formData, confirmPassword: event.target.value })}
                className="custom-input"
              />

{/* Add similar input elements for other fields */}

  </div>
  )
}

export default SignUpInfo