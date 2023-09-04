package com.shramsevak.shramSevak.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CategoryDTO;
import com.shramsevak.shramSevak.service.CategoryService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/category")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllCategory(){
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
	

	@GetMapping("/{categoryId}")
	public ResponseEntity<?> getById(@PathVariable Long categoryId){
		return new ResponseEntity<>(categoryService.getById(categoryId), HttpStatus.OK);
	}
	
	@PostMapping("/add")
	public ResponseEntity<?> addCategory(@RequestBody CategoryDTO category){
		return new ResponseEntity<>(categoryService.add(category), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{categoryId}")
	public ResponseEntity<?> deleteCategory(@PathVariable Long categoryId){
		return new ResponseEntity<>(categoryService.delete(categoryId), HttpStatus.OK);
	}
	
	@PatchMapping("/update")
	public ResponseEntity<?> updateCategory(@RequestBody CategoryDTO category){
		return new ResponseEntity<>(categoryService.update(category), HttpStatus.OK);
	}
	
	@GetMapping("/{categoryId}/skills")
	public ResponseEntity<?> getSkillsByCategoryId(@PathVariable Long categoryId){
		return new ResponseEntity<>(categoryService.getSkillsByCategoryId(categoryId), HttpStatus.OK);

	}

}
