package com.shramsevak.shramSevak.service;

import java.util.List;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CategoryDTO;
import com.shramsevak.shramSevak.dto.SkillDTO;

import jakarta.validation.Valid;

public interface CategoryService {
	
	List<CategoryDTO> getAllCategories();

	
	CategoryDTO updateCategory(Long id ,@Valid CategoryDTO categoryDTO);
	
	ApiResponse deteleCategoryById(Long id);

	ApiResponse add(CategoryDTO category);

	ApiResponse delete(Long categoryId);

	ApiResponse update(CategoryDTO category);

	List<SkillDTO> getSkillsByCategoryId(Long categoryId);

	CategoryDTO getById(Long categoryId);

}
