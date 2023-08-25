package com.shramsevak.shramSevak.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CityResponseDTO;
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
	
	@GetMapping("/city/{cityId}")
	public ResponseEntity<List<LocalityResponceDTO>> getAllLocalitiesByCityId(@PathVariable Long cityId) {
		List<LocalityResponceDTO> localityDTOs = localityService.getAllLocalitiesByCityId(cityId);
		log.info("it Locality Controller - Get All Localities by given City Id");
		return new ResponseEntity<>(localityDTOs, HttpStatus.OK);

	}
//	
//	@GetMapping("/state/{stateId}")
//	public ResponseEntity<List<CityResponseDTO>> getAllCitiesByStateId(@PathVariable Long stateId) {
//		List<CityResponseDTO> cityDTOs = cityService.getAllCitiesByStateId(stateId);
//		log.info("ity Controller - Get All Citys by given State Id");
//		return new ResponseEntity<>(cityDTOs, HttpStatus.OK);
//
//	}
}
