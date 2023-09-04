import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ChooseSkills = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const workerID = location.state;
  useEffect(() => {
    fetchCategories();
  }, []);

  

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/category/all');
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSkills = async (categoryId) => {
    try {
      console.log("Category ID is"+categoryId)
      const response = await axios.get(`http://localhost:8080/skill/category/${categoryId}`);
      setSkills(response.data);
      console.log(response.status)
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    fetchSkills(categoryId);
  };

  const handleSkillChange = (event) => {
    const skillId = event.target.value;
    const skill = skills.find((s) => s.id === parseInt(skillId));
    const isSelected = selectedSkills.some((s) => s.id === skill.id);
    if (isSelected) {
      const updatedSkills = selectedSkills.filter((s) => s.id !== skill.id);
      setSelectedSkills(updatedSkills);
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <div className="bg-slate-200">
       
    <h1 className="p-5 text-red-500 font-serif text-center block text-5xl font-semibold">Choose Your Skills</h1>
    <form action="#"  target="_self" className="max-w-fit mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-2 gap-6">
        <div>
        
          <label className="block text-lg font-semibold">
            Select a category:
            <select
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">-- Select a category --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Select skills:</h2>
          {skills.length === 0 ? (
            <p>No skills to display.</p>
          ) : (
            <div>
              {skills.map((skill) => (
                <label key={skill.id} className="flex items-center">
                  <input
                    type="checkbox"
                    value={skill.id}
                    checked={selectedSkills.some((s) => s.id === skill.id)}
                    onChange={handleSkillChange}
                    className="mr-2"
                  />
                  <span>{skill.skillName}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Selected skills:</h2>
        {selectedSkills.length === 0 ? (
          <p>No skills selected.</p>
        ) : (
          <p className="mb-1 text-blue-900 font-semibold">
            {selectedSkills.map((skill) => skill.skillName).join(', ')}
          </p>
        )}
      </div>
      <button 
      className='mx-3 my-10' 
      type='button'
      onClick= { async () => {
        
        const skillSet = selectedSkills.map(skill=> skill.id)
        const reqData = {
          skillIds : skillSet,
          workerId : workerID
          }
        try {
          const response = await axios.post('http://localhost:8080/skill/addSkills', reqData)
          if (response.status === 200) {
            try {
              navigate('/registationsuccess');
            } catch (error) {
              console.error('Navigation error:', error);
            }
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
    </form>
    </div>
  );
};

export default ChooseSkills;