import React, { useState, useEffect } from "react";
import axios from "axios";

const ChooseWorkingLocation = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
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
      axios.get(`http://localhost:8080/city/by-state/${selectedState}`)
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
      axios.get(`http://localhost:8080/locality/by-city/${selectedCity}`)
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
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.city}
          </option>
        ))}
      </select>
      <select
        id="locality"
        value={selectedLocality}
      >
        {localities.map((locality) => (
          <option key={locality.id} value={locality.id}>
            {locality.locality}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChooseWorkingLocation;
