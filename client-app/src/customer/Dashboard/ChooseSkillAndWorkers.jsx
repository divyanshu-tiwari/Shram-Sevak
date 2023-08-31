import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const timeSlotOptions = [
  { label: '9-11', start: '09', end: '11' },
  { label: '11-1', start: '11', end: '13' },
  { label: '1-3', start: '13', end: '15' },
  { label: '3-5', start: '15', end: '17' },
];

const ChooseSkillAndWorkers = ({ formData, setFormData }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [timeSlot, setTimeSlot] = useState("");
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  

  const navigate=useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8080/category/all")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleWorkerSelection = (workerId) => {
   
    setSelectedWorker(workerId);
    navigate(`/orderBook/${workerId}/${startTime}/${endTime}`)
  };
  const fetchAvailableWorkers = (selectedSkill, newStartTime, newEndTime) => {
    const apiUrl = `http://localhost:8080/worker/available/skill/${selectedSkill}/start/${encodeURIComponent(newStartTime)}/end/${encodeURIComponent(newEndTime)}`;
    
    axios.get(apiUrl)
      .then((response) => {
        setWorkers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  let selectedSlot = null;
  const handleTimeSlotChange = (selectedSlot) => {
    const selectedTimeSlot = timeSlotOptions.find((slot) => slot.label === selectedSlot);
    if (selectedTimeSlot) {
      const currentTime = new Date().toISOString().slice(0, 10);
      const newStartTime = `${currentTime}T${selectedTimeSlot.start}:00`;
      const newEndTime = `${currentTime}T${selectedTimeSlot.end}:00`;
      setStartTime(newStartTime);
      setEndTime(newEndTime);
    

      if (selectedSkill && newStartTime && newEndTime) {
        fetchAvailableWorkers(selectedSkill, newStartTime, newEndTime);
      }
    }
  };


  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
   
    setSkills([]);
    setSelectedSkill(null);
    if (event.target.value !== null) {
     
      axios.get(`http://localhost:8080/skill/category/${event.target.value}`)
        .then((response) => {
          setSkills(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // useEffect(() => {
  //   if (selectedSkill !== null) {
  //     axios.get(`http://localhost:8080/skill/getWorkers/${selectedSkill}`)
  //       .then((response) => {
  //         setWorkers(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, [selectedSkill]);

  return (
    <div className="max-w-md mx-auto p-8 bg-white border rounded">
  <h1 className="text-2xl font-bold mb-4">Choose Skill and Workers</h1>
  
  <div className="mb-4">
    <label htmlFor="category" className="block mb-2">
      Category:
    </label>
    <select
      id="category"
      onChange={handleCategoryChange}
      value={selectedCategory}
      className="w-full p-2 border rounded"
    >
      <option value="Select Category" selected>
        Select Category
      </option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.categoryName}
        </option>
      ))}
    </select>
  </div>
  
  <div className="mb-4">
    <label htmlFor="skill" className="block mb-2">
      Skill:
    </label>
    <select
      id="skill"
      onChange={(e) => setSelectedSkill(e.target.value)}
      value={selectedSkill}
      className="w-full p-2 border rounded"
    >
      <option value="Select Skill" selected>
        Select Skill
      </option>
      {skills.map((skill) => (
        <option key={skill.id} value={skill.id}>
          {skill.skillName}
        </option>
      ))}
    </select>
  </div>

  <label className="mb-4">
    <span className="mr-2">Time Slot:</span>
    <select name="timeSlot" value={selectedSlot} onChange={(e) => handleTimeSlotChange(e.target.value)} className="border border-gray-300 rounded-md p-2">
      <option value="">Select Time Slot</option>
      {timeSlotOptions.map((slot) => (
        <option key={slot.label} value={slot.label}>
          {slot.label}
        </option>
      ))}
    </select>
  </label>
  
  <h2 className="text-lg font-bold mb-4">List of Workers:</h2>
  
  <div className="overflow-y-auto max-h-64">
    <ul className="space-y-4">
      {workers.map((worker) => (
        <li key={worker.id} className="flex items-center">
          <input
            type="radio"
            name="worker"
            value={worker.id}
            checked={selectedWorker === worker.id}
            onChange={() => handleWorkerSelection(worker.id)}
            className="mr-2"
          />
          <span>
            {worker.firstName} {worker.lastName}
          </span>
        </li>
      ))}
    </ul>
  </div>
</div>
  );
};

export default ChooseSkillAndWorkers;
