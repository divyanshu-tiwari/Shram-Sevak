import React, { useState, useEffect } from 'react';

const BackendURL = 'http://localhost:8080';

function ChooseCategories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  useEffect(() => {
    fetch(`${BackendURL}/category/all`)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryToggle = categoryId => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  return (
    <div>
      <h2>Select Categories</h2>
      {categories.map(category => (
        <label key={category.id}>
          <input
            type="checkbox"
            checked={selectedCategories.includes(category.id)}
            onChange={() => handleCategoryToggle(category.id)}
          />
          {category.categoryName}
        </label>
      ))}
    </div>
  );
}

export default ChooseCategories;


// function SkillSelection({ selectedCategories }) {
//   const [skills, setSkills] = useState([]);
//   const [selectedSkills, setSelectedSkills] = useState([]);

//   useEffect(() => {
//     if (selectedCategories.length > 0) {
//       const categoryIds = selectedCategories.join(',');
//       fetch(`${BackendURL}/skill/getCategory/${categoryIds}`)
//         .then(response => response.json())
//         .then(data => setSkills(data))
//         .catch(error => console.error('Error fetching skills:', error));
//     } else {
//       setSkills([]);
//     }
//   }, [selectedCategories]);

//   const handleSkillToggle = skillId => {
//     if (selectedSkills.includes(skillId)) {
//       setSelectedSkills(selectedSkills.filter(id => id !== skillId));
//     } else {
//       setSelectedSkills([...selectedSkills, skillId]);
//     }
//   };

//   return (
//     <div>
//       <h2>Select Skills</h2>
//       {skills.map(skill => (
//         <label key={skill.id}>
//           <input
//             type="checkbox"
//             checked={selectedSkills.includes(skill.id)}
//             onChange={() => handleSkillToggle(skill.id)}
//           />
//           {skill.skillName}
//         </label>
//       ))}
//     </div>
//   );
// }


