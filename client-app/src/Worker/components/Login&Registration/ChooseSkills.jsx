import React, { useState, useEffect } from "react";
import axios from "axios";
import MultiSelect from "react-multiselect-dropdown";

const ChooseSkills = () => {
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/category/all")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    setSkills(null);
    setSelectedSkills([]);
    const categoryId = event.target.value;
    if (categoryId !== null) {
      axios.get(`http://localhost:8080/skill/${categoryId}`)
        .then((response) => {
          setSkills(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleSkillChange = (event) => {
    const newSelectedSkills = [...selectedSkills];
    if (newSelectedSkills.indexOf(event.target.value) === -1) {
      newSelectedSkills.push(event.target.value);
    } else {
      newSelectedSkills.splice(newSelectedSkills.indexOf(event.target.value), 1);
    }
    setSelectedSkills(newSelectedSkills);
  };

  return (
    <div>
      <h1>Skills</h1>
      <select
        id="category"
        onChange={handleCategoryChange}
        value={categories[0].id}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.categoryName}
          </option>
        ))}
      </select>
      <MultiSelect
        id="skills"
        value={selectedSkills}
        label="Skills"
        onChange={handleSkillChange}
        options={skills}
        allowMultiple={true}
      />
    </div>
  );
};

export default ChooseSkills;
