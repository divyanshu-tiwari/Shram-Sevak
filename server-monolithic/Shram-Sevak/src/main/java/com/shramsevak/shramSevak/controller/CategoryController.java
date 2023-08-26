package com.shramsevak.shramSevak.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shramsevak.shramSevak.dto.CategoryDTO;
import com.shramsevak.shramSevak.dto.StateDTO;
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
	public ResponseEntity<List<CategoryDTO>> getAllStates(){
		
		List<CategoryDTO> catDTOs = categoryService.getAllCategories();
		
		return ResponseEntity.ok(catDTOs);
	}

}
