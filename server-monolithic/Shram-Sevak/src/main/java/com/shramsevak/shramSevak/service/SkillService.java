package com.shramsevak.shramSevak.service;

import java.util.List;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.SkillAddDto;
import com.shramsevak.shramSevak.dto.SkillDto;
import com.shramsevak.shramSevak.dto.WorkerResponceDto;

public interface SkillService {

	List<SkillDto> getSkills(Long categoryId);

	ApiResponse addRegSkills(SkillAddDto skillAddDto);

	List<WorkerResponceDto> getWorkers(Long id);

}
