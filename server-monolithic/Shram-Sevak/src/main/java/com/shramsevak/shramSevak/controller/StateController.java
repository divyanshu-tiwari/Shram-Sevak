package com.shramsevak.shramSevak.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.StateDTO;
import com.shramsevak.shramSevak.service.StateService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@Validated
@RequestMapping("/state")
@CrossOrigin(origins = "http://localhost:3000")
public class StateController {

	@Autowired
	private StateService stateService;

	@PostMapping("/add")
	public ResponseEntity<?> addState(@RequestBody @Valid StateDTO stateDTO) {
		ApiResponse response = stateService.addState(stateDTO);
		log.info("State Controller - Add State");
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getStateById(@PathVariable Long id) {
		StateDTO stateDTO = stateService.getStateById(id);
		log.info("State Controller - Add State By Id");
		return ResponseEntity.ok(stateDTO);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteStateById(@PathVariable Long id) {
		ApiResponse response = stateService.deleteStateById(id);
		log.info("State Controller - Delete State By Id");
		return ResponseEntity.ok(response);
	}

	@DeleteMapping("/delete-all")
	public ResponseEntity<ApiResponse> deleteAllStates() {
		ApiResponse response = stateService.deleteAllStates();
		log.info("State Controller - Delete All State By Id");

		return ResponseEntity.ok(response);
	}

	@PutMapping("/update")
	public ResponseEntity<StateDTO> updateState(@RequestBody @Valid StateDTO stateDTO) {
		StateDTO updatedStateDTO = stateService.updateState(stateDTO.getId(), stateDTO);
		log.info("State Controller - Update State By Id");
		return ResponseEntity.status(HttpStatus.CREATED).body(updatedStateDTO);
	}

	@GetMapping("/all")
	public ResponseEntity<List<StateDTO>> getAllStates() {
		List<StateDTO> stateDTOs = stateService.getAllStates();
		log.info("State Controller - Get All States");

		return ResponseEntity.ok(stateDTOs);
	}

}