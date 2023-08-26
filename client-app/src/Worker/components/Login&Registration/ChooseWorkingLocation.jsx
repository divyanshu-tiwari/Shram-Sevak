import React, { useState, useEffect } from "react";
import axios from "axios";

const ChooseWorkingLocation = ({ formData, setFormData }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLocality, setSelectedLocality] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/state/all")
      .then((response) => {
        setStates(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

      

  }, []);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setCities([]);
    setLocalities([]);
    if (selectedState !== null) {
      axios.get(`http://localhost:8080/city/state/${event.target.value}`)
        .then((response) => {
          setCities(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
        
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setLocalities([]);
    if (selectedCity !== null) {
      axios.get(`http://localhost:8080/locality/city/${event.target.value}`)
        .then((response) => {
          setLocalities(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <h1>State, City, and Locality</h1>
      <select
        id="state"
        onChange={handleStateChange}
        value={selectedState}
      >
        <option  value="Select State" selected>
            Select State
          </option>
        {states.map((state) => (
          <option key={state.id} value={state.id}>
            {state.state}
          </option>
        ))}
      </select>
      <select
        id="city"
        onChange={handleCityChange}
        value={selectedCity}
      >
        <option  value="Select City" selected>
            Select City
          </option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.city}
          </option>
        ))}
      </select>
      <select
        id="locality"
        value={selectedLocality}
        onChange={(e) => {
          setFormData({ ...formData, localityId: e.target.value });
        }}
      >
        <option  value="Select Locality" selected>
            Select Locality
          </option>
        {localities.map((locality) => (
          <option key={locality.id} value={locality.id}>
            {locality.locality}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Pincode.."
        onChange={(e) => {
          setFormData({ ...formData, pincode: e.target.value });
        }}
      />
    </div>
  );
};

export default ChooseWorkingLocation;
