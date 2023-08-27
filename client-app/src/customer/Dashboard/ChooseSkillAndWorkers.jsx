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
   
    alert(selectedCategory)
    setSkills([]);
    setSelectedSkill(null);
    if (event.target.value !== null) {
     
      axios.get(`http://localhost:8080/skill/getCategory/${event.target.value}`)
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
    <div>
      <h1>Choose Skill and Workers</h1>
      <select
        id="category"
        onChange={handleCategoryChange}
        value={selectedCategory}
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
      <select
        id="skill"
        onChange={(e) => setSelectedSkill(e.target.value)}
        value={selectedSkill}
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
      <h2>List of Workers:</h2>
      <div >
      <ul className="space-y-4">
        {workers.map((worker) => (
          <li key={worker.id}>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="worker"
                value={worker.id}
                checked={selectedWorker === worker.id}
                onChange={() => handleWorkerSelection(worker.id)}
              />
              <span>
                {worker.firstName} {worker.lastName}
              </span>
            </label>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default ChooseSkillAndWorkers;
