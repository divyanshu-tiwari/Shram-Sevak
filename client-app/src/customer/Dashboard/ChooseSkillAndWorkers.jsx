import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChooseSkillAndWorkers = ({ formData, setFormData }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
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
    alert(workerId);
    setSelectedWorker(workerId);
    navigate(`/orderBook/${workerId}`)
  };


  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
   alert(event.target.value)
    alert(selectedCategory)
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

  useEffect(() => {
    if (selectedSkill !== null) {
      axios.get(`http://localhost:8080/skill/getWorkers/${selectedSkill}`)
        .then((response) => {
          setWorkers(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedSkill]);

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
