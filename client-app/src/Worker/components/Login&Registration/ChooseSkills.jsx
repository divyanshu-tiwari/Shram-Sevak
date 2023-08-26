import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChooseSkills = () => {
  const [states, setStates] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('http://localhost:8080/state/all');
        setStates(response.data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);

  const fetchCities = async (stateId) => {
    try {
      const response = await axios.get(`http://localhost:8080/city/state/${stateId}`);
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleStateChange = (event) => {
    const selectedStateIds = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedStates(selectedStateIds);

    setSelectedCities([]);
    selectedStateIds.forEach((stateId) => fetchCities(stateId));
  };

  const handleCityChange = (event) => {
    const selectedCityIds = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedCities(selectedCityIds);
  };

  return (
    <div>
      <h2>Select States</h2>
      <select multiple value={selectedStates} onChange={handleStateChange}>
        {states.map((state) => (
          <option key={state.id} value={state.id}>{state.state}</option>
        ))}
      </select>

      <h2>Select Cities</h2>
      <select multiple value={selectedCities} onChange={handleCityChange}>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>{city.city}</option>
        ))}
      </select>

      <h2>Selected Cities</h2>
      {selectedCities.map((selectedCityId) => {
        const selectedCity = cities.find((city) => city.id === Number(selectedCityId));
        return (
          <p key={selectedCity.id}>{selectedCity.city}</p>
        );
      })}
    </div>
  );
};

export default ChooseSkills;