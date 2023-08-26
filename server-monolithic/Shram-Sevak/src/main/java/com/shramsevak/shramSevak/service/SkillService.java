package com.shramsevak.shramSevak.service;

import java.util.List;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.SkillAddDto;

import com.shramsevak.shramSevak.dto.SkillDTO;
import com.shramsevak.shramSevak.dto.SkillResponseDTO;

import jakarta.validation.Valid;

import com.shramsevak.shramSevak.dto.SkillDto;

public interface SkillService {
	
	ApiResponse addSkill(@Valid SkillDTO skillDTO );
	
	ApiResponse deleteSkillById(Long id);
	
	ApiResponse deleteAllSkills();
	
	ApiResponse addRegSkills(SkillAddDto skillAddDto);
	
	SkillResponseDTO getSkillById(Long id);
	
	SkillResponseDTO updateSkill(Long skillId,@Valid SkillDTO skillDTO );

	List<SkillResponseDTO> getAllSkills();
	
	List<SkillResponseDTO> getAllSkillsByCategoryId(Long categoryId);

	ApiResponse addRegSkills(SkillAddDto skillAddDto);

}
