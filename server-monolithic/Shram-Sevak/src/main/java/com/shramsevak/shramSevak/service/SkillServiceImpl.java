package com.shramsevak.shramSevak.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shramsevak.shramSevak.dto.SkillDto;
import com.shramsevak.shramSevak.entity.Skill;
import com.shramsevak.shramSevak.repository.SkillRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class SkillServiceImpl implements SkillService {
	@Autowired
	private SkillRepository skillRepo;
	
	@Autowired
	private ModelMapper mapper;
	

	@Override
	public List<SkillDto> getSkills(Long categoryId) {
		List<Skill> list=skillRepo.findByCategoryId(categoryId);
		list.forEach(skill -> {
		   
		    System.out.println(skill.getSkillName());
		});
		return list.stream().
				map( skill -> mapper.map(skill, SkillDto.class))
				.collect(Collectors.toList());
	}

}
