package com.shramsevak.shramSevak.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shramsevak.shramSevak.customException.WorkerException;
import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.SkillAddDto;
import com.shramsevak.shramSevak.dto.SkillDto;
import com.shramsevak.shramSevak.entity.Skill;
import com.shramsevak.shramSevak.entity.Worker;
import com.shramsevak.shramSevak.entity.WorkerStatus;
import com.shramsevak.shramSevak.repository.SkillRepository;
import com.shramsevak.shramSevak.repository.WorkerRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class SkillServiceImpl implements SkillService {
	@Autowired
	private SkillRepository skillRepo;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private WorkerRepository workerRepo;
	

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


	@Override
	public ApiResponse addRegSkills(SkillAddDto skillAddDto) {
		Worker worker=workerRepo.findById(skillAddDto.getWorkerId()).orElseThrow(() -> new WorkerException("Invalid worker ID"));
		List<Skill> skills = skillRepo.findAllById(skillAddDto.getSkillIds());
		skills.stream().forEach(skill -> worker.addSkill(skill));
		worker.setStatus(WorkerStatus.ACTIVE);
		return new ApiResponse(" Skill added Successfully ");
	}

}
