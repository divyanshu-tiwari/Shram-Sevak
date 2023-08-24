package com.shramsevak.shramSevak.service;

import java.util.List;

import com.shramsevak.shramSevak.dto.SkillDto;

public interface SkillService {

	List<SkillDto> getSkills(Long categoryId);

}
