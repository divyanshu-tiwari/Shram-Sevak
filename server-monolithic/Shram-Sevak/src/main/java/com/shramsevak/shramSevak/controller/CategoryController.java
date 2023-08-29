package com.shramsevak.shramSevak.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CategoryDTO;
import com.shramsevak.shramSevak.dto.CityDTO;
import com.shramsevak.shramSevak.dto.CityResponseDTO;
import com.shramsevak.shramSevak.service.CategoryService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/category")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping("/all")
	public ResponseEntity<List<CategoryDTO>> getAllStates(){
		log.info("get all categories");
		List<CategoryDTO> catDTOs = categoryService.getAllCategories();
		
		return ResponseEntity.ok(catDTOs);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteCategoryById(@PathVariable Long id) {
		ApiResponse response = categoryService.deteleCategoryById(id);
		log.info("Category Controller - Delete Category By Id");
		return ResponseEntity.ok(response);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody @Valid CategoryDTO categoryDTO) {
		CategoryDTO updatedCategoryDTO = categoryService.updateCategory(id, categoryDTO);
		log.info("Category Controller - Update Category By Id");
		return ResponseEntity.status(HttpStatus.CREATED).body(updatedCategoryDTO);
	}

}
