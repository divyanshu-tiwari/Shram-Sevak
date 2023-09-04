package com.shramsevak.shramSevak.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.LocalityDTO;
import com.shramsevak.shramSevak.dto.LocalityResponceDTO;
import com.shramsevak.shramSevak.service.LocalityService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;


@RestController
@Slf4j
@Validated
@RequestMapping("/locality")
@CrossOrigin(origins = "http://localhost:3000")
public class LocalityController {
	
	@Autowired
	private LocalityService localityService;

	
	@PostMapping("/add")
	public ResponseEntity<?> addLocality(@RequestBody @Valid LocalityDTO localityDTO) {
		ApiResponse response = localityService.addLocality(localityDTO);
		log.info("locality Controller - Add locality Successfully");
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getLocalityById(@PathVariable Long id){
		LocalityResponceDTO localityDTO = localityService.getLocalityById(id);
		log.info("Locality Controller - Add Locality By Id");
		return ResponseEntity.ok(localityDTO);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?>deleteLocalityById(@PathVariable Long id){
		ApiResponse response = localityService.deleteLocalityById(id);
		log.info("Locality Controller - Delete Locality By Id");
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping("/delete-all")
	public ResponseEntity<?>deleteAllLocalities(){
		ApiResponse response = localityService.deleteAllLocalities();
		log.info("Locality Controller - Delete All Localities");
		return ResponseEntity.ok(response);
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> updateLocalityById(@RequestBody @Valid LocalityDTO localityDTO){
		LocalityResponceDTO updateLocalityDTO =localityService.updateLocality(localityDTO.getId(), localityDTO);
		log.info("Locality Controller - Update Locality By Id");
		return ResponseEntity.status(HttpStatus.CREATED).body(updateLocalityDTO);
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<LocalityResponceDTO>> getAllLocalities(){
		List<LocalityResponceDTO> localityList = localityService.getAllLocalies();
		log.info("Locality Controller - Get All Localities");

		return ResponseEntity.ok(localityList);
	}
	
	@GetMapping("/city/{cityId}")
	public ResponseEntity<List<LocalityResponceDTO>> getAllLocalitiesByCityId(@PathVariable Long cityId) {
		List<LocalityResponceDTO> localityDTOs = localityService.getAllLocalitiesByCityId(cityId);
		log.info("it Locality Controller - Get All Localities by given City Id");
		return new ResponseEntity<>(localityDTOs, HttpStatus.OK);

	}

	
	@GetMapping("/getPin/{id}")
	public ResponseEntity<?> getPinbyLocalityId(@PathVariable Long id) {
	return new ResponseEntity<>(localityService.getPin(id), HttpStatus.OK);
	}

}
