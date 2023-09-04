import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';


const ChangeWorkingLocation = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [selectedPincode, setPincode] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLocality, setSelectedLocality] = useState(null);
  const currentUser = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    workerId: currentUser.value.id,
    localityId: ""
  });

  useEffect(() => {
    axios.get("http://localhost:8080/state/all")
      .then((response) => {
        setStates(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      setSelectedState(0)
      setSelectedCity(0)     

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
       setSelectedLocality(0);
    }
  };

  const getPincodeBySelectedLocality = (e) => {
    setSelectedLocality(e.target.value)
    if (selectedLocality !== null) {
      axios.get(`http://localhost:8080/locality/getPin/${e.target.value}`)
        .then((response) => {
          setPincode(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

        setFormData({ ...formData, localityId: e.target.value });
    }

  }

  return (
    <div>
      <h1>Change Working Location</h1>
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
        onChange={getPincodeBySelectedLocality}
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
        placeholder= {selectedPincode}
        onChange={(e) => {
          setFormData({ ...formData, pincode: selectedPincode });
        }}
        readOnly
      />
      <button 
      className='mx-3 my-10' 
      type='button'
      onClick= { async () => {
        try {
          const response = await axios.patch('http://localhost:8080/worker/locality', formData)
          if (response.status === 200) {
            console.log("locality updated successfully")
            alert("locality updated successfully")
          } else {
            alert(response.data);
          }
        } catch (error) {
        alert('An error occurred while submitting the form.');
        console.error(error);
        }
      }
      }>
        SUBMIT
      </button>
    </div>
  );
};

export default ChangeWorkingLocation;
