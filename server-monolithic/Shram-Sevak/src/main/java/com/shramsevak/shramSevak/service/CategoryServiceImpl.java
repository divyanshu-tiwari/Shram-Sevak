package com.shramsevak.shramSevak.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shramsevak.shramSevak.dto.CategoryDTO;
import com.shramsevak.shramSevak.dto.StateDTO;
import com.shramsevak.shramSevak.repository.CategoryRepository;

import jakarta.transaction.Transactional;

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
	
	
	
	
	

}
