package com.shramsevak.shramSevak.controller;

import java.io.Console;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shramsevak.shramSevak.dto.SkillAddDto;
import com.shramsevak.shramSevak.service.SkillService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/skill")
@CrossOrigin(origins = "http://localhost:3000")
public class SkillController {
	@Autowired
	private SkillService skillService;
	
	@GetMapping("/getCategory/{CategoryId}")
    public ResponseEntity<?> getAllSkillsByCategory(@PathVariable Long CategoryId){
		
    	return ResponseEntity.ok(skillService.getSkills(CategoryId));
 }
	
	@PostMapping("/addSkills")
	public ResponseEntity<?> addRegistrastionSkills(@RequestBody SkillAddDto skillAddDto){
		return ResponseEntity.ok(skillService.addRegSkills(skillAddDto));
	}
	
	@GetMapping("/getWorkers/{id}")
	public ResponseEntity<?> getWorkerList(@PathVariable Long id){
		return ResponseEntity.ok(skillService.getWorkers(id));
	}
	
}
