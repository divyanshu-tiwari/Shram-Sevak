package com.shramsevak.shramSevak.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.SkillAddDto;
import com.shramsevak.shramSevak.dto.SkillDTO;
import com.shramsevak.shramSevak.dto.SkillResponseDTO;
import com.shramsevak.shramSevak.service.SkillService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/skill")
@CrossOrigin(origins = "http://localhost:3000")
public class SkillController {
	@Autowired
	private SkillService skillService;

	// Add Skill With Category ID
	@PostMapping("/add")
	public ResponseEntity<?> addSkill(@RequestBody @Valid SkillDTO skilDTO) {
		ApiResponse response = skillService.addSkill(skilDTO);
		log.info("Skill Controller - Add Skill Successfully");
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	// Get by Id
	@GetMapping("/{id}")
	public ResponseEntity<?> getSkillById(@PathVariable Long id) {
		SkillResponseDTO skillDTO = skillService.getSkillById(id);
		log.info("Skill Controller - Add Skill By Id");
		return ResponseEntity.ok(skillDTO);
	}

	@GetMapping("/all")
	public ResponseEntity<List<SkillResponseDTO>> getAllSkills() {
		List<SkillResponseDTO> skillDTOs = skillService.getAllSkills();
		log.info("Skill Controller - Get All Skills");
		return ResponseEntity.ok(skillDTOs);
	}

	// Add Skill With Worker ID
	@PostMapping("/addSkills")
	public ResponseEntity<?> addRegistrastionSkills(@RequestBody SkillAddDto skillAddDto) {
		return ResponseEntity.ok(skillService.addRegSkills(skillAddDto));
	}

	
	@GetMapping("/getWorkers/{id}")
	public ResponseEntity<?> getWorkerList(@PathVariable Long id){
		return ResponseEntity.ok(skillService.getWorkers(id));
	}
	


	// Delete By ID
	@DeleteMapping("/{id}")
	ResponseEntity<?> deleteSkillById(@PathVariable Long id) {
		ApiResponse response = skillService.deleteSkillById(id);
		log.info("Skill Controller - Delete Skill By Id");
		return ResponseEntity.ok(response);
	}

	// Delete All
	@DeleteMapping("/delete-all")
	ResponseEntity<?> deleteAllSkill() {
		ApiResponse response = skillService.deleteAllSkills();
		log.info("Skill Controller - Delete All Skills");
		return ResponseEntity.ok(response);
	}

	// Update
	@PutMapping("/update")
	public ResponseEntity<?> updateSkill(@RequestBody @Valid SkillDTO skillDTO) {
		SkillResponseDTO updatSkillDto = skillService.updateSkill(skillDTO.getId(), skillDTO);
		log.info("Skill Controller - Update Skill By Id");
		return ResponseEntity.status(HttpStatus.CREATED).body(updatSkillDto);

	}

	@GetMapping("/category/{CategoryId}")
	public ResponseEntity<?> getAllSkillsByCategory(@PathVariable Long CategoryId) {
		log.info("Skill Controller - Get All Skills By Category");

		return ResponseEntity.ok(skillService.getAllSkillsByCategoryId(CategoryId));
	}


}
