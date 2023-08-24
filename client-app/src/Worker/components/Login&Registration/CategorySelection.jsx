// CategorySelection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CategorySelection({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/category/all');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <button onClick={() => onSelectCategory(category.id)}>
              {category.categoryName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategorySelection;
