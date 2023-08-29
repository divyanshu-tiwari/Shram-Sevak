package com.shramsevak.shramSevak.service;

import java.util.List;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CategoryDTO;

import jakarta.validation.Valid;

public interface CategoryService {
	
	List<CategoryDTO> getAllCategories();
	
	CategoryDTO updateCategory(Long id ,@Valid CategoryDTO categoryDTO);
	
	ApiResponse deteleCategoryById(Long id);
	
	
}
