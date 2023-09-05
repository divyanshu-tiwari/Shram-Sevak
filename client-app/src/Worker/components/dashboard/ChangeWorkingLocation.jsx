import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import stateService from "../../../utils/service/state.service";
import cityService from "../../../utils/service/city.service";
import localityService from "../../../utils/service/locality.service";
import workerService from "../../../utils/service/worker.service";


const ChangeWorkingLocation = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLocality, setSelectedLocality] = useState(null);
  const [selectedPincode, setPincode] = useState();
  const currentUser = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    workerId: currentUser.value.id,
    localityId: ""
  });

  useEffect(() => {
      stateService.getAll() //axios.get("http://localhost:8080/state/all")
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
        cityService.getAllCitiesByStateId(event.target.value) //axios.get(`http://localhost:8080/city/state/${event.target.value}`)
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
        localityService.getAllByCityId(event.target.value)  // axios.get(`http://localhost:8080/locality/city/${event.target.value}`)
        .then((response) => {
          setLocalities(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
       setSelectedLocality(0);
    }
  };

  const getPincodeBySelectedLocality = (event) => {
    setSelectedLocality(event.target.value)
    if (selectedLocality !== null) {
        localityService.getPincodeByLocalityId(event.target.value)  //axios.get(`http://localhost:8080/locality/getPin/${event.target.value}`)
        .then((response) => {
          setPincode(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

        setFormData({ ...formData, localityId: event.target.value });
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
          workerService.updateWorkingLocation(formData) //axios.patch('http://localhost:8080/worker/locality', formData)
          .then(response=>{
            console.log("locality updated successfully")
            alert("locality updated successfully")
          
          })
          .catch (error=>{
            alert('An error occurred while submitting the form: '+error);
          }) 
      }
      }>
        SUBMIT
      </button>
    </div>
  );
};

export default ChangeWorkingLocation;
