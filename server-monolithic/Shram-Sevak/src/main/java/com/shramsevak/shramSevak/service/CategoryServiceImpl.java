package com.shramsevak.shramSevak.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shramsevak.shramSevak.customException.ResourceNotFoundException;
import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CategoryDTO;
import com.shramsevak.shramSevak.dto.SkillDTO;
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

	@Override
	public ApiResponse add(CategoryDTO category) {
		Category categoryToAdd = mapper.map(category, Category.class);
		categoryRepo.save(categoryToAdd);
		return new ApiResponse("Category add succesfully. CATEGORY_ID : " + categoryToAdd.getId());
	}

	@Override
	public ApiResponse delete(Long categoryId) {
		Category category = categoryRepo.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("No such category exists with ID : " + categoryId));
		categoryRepo.delete(category);
		return new ApiResponse("Category deleted successfully");
	}

	@Override
	public ApiResponse update(CategoryDTO category) {
		Category categoryToUpdate = categoryRepo.findById(category.getId()).orElseThrow(() -> new ResourceNotFoundException("INVALID_CATEGORY_ID : No such category found"));
		categoryToUpdate.setCategoryName(category.getCategoryName());
		return new ApiResponse("Category updated successfully");
	}

	@Override
	public List<SkillDTO> getSkillsByCategoryId(Long categoryId) {
		Category category = categoryRepo.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("INVALID_CATEGORY_ID : No such category exists."));
		List<SkillDTO> skills = category.getSkills().stream().map(skill -> mapper.map(skill, SkillDTO.class)).collect(Collectors.toList());
		if(skills.isEmpty())
			throw new ResourceNotFoundException("No associated skills exists for Category ID : " + categoryId);
		return skills;
	}

	@Override
	public CategoryDTO getById(Long categoryId) {
		Category category = categoryRepo.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("No such category found"));
		return mapper.map(category, CategoryDTO.class);

	}

}
