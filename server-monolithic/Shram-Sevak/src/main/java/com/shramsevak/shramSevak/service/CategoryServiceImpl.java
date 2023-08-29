package com.shramsevak.shramSevak.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shramsevak.shramSevak.customException.ResourceNotFoundException;
import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CategoryDTO;
import com.shramsevak.shramSevak.dto.StateDTO;
import com.shramsevak.shramSevak.entity.Category;
import com.shramsevak.shramSevak.repository.CategoryRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepo;
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public List<CategoryDTO> getAllCategories() {
		
		return  categoryRepo.findAll().stream().map(state -> mapper.map(state, CategoryDTO.class)).collect(Collectors.toList());
	}

	@Override
	public CategoryDTO updateCategory(Long id, @Valid CategoryDTO categoryDTO) {
		Category category = categoryRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid Category ID"));
		mapper.map(categoryDTO, category);
		return mapper.map(category, CategoryDTO.class);
	}

	@Override
	public ApiResponse deteleCategoryById(Long id) {
		Category category = categoryRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid Category ID"));
		categoryRepo.delete(category);
		return new ApiResponse("Category "+ category.getCategoryName() + " Deleted Successfully..");
	}
	
	
	
	
	

}
