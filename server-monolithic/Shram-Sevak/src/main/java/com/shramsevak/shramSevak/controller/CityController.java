package com.shramsevak.shramSevak.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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
import com.shramsevak.shramSevak.dto.CityDTO;
import com.shramsevak.shramSevak.dto.CityResponseDTO;
import com.shramsevak.shramSevak.service.CityService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@Validated
@RequestMapping("/city")
@CrossOrigin(origins = "http://localhost:3000")
public class CityController {

	@Autowired
	private CityService cityService;

	@PostMapping("/add")
	public ResponseEntity<?> addState(@RequestBody @Valid CityDTO cityDTO) {
		ApiResponse response = cityService.addCity(cityDTO);
		log.info("City Controller - Add City Successfully");
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getCityById(@PathVariable Long id) {
		CityResponseDTO cityDTO = cityService.getCityById(id);
		log.info("City Controller - Add State By Id");
		return ResponseEntity.ok(cityDTO);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteCityById(@PathVariable Long id) {
		ApiResponse response = cityService.deleteCityById(id);
		log.info("City Controller - Delete City By Id");
		return ResponseEntity.ok(response);
	}

	@DeleteMapping("/delete-all")
	public ResponseEntity<ApiResponse> deleteAllCitys() {
		ApiResponse response = cityService.deleteAllCitys();
		log.info("City Controller - Delete All Citys");

		return ResponseEntity.ok(response);
	}

	@PutMapping("/update")
	public ResponseEntity<?> updateCity(@RequestBody @Valid CityDTO cityDTO) {
		CityResponseDTO updatedCityDTO = cityService.updateCity(cityDTO.getId(), cityDTO);
		log.info("City Controller - Update City By Id");
		return ResponseEntity.status(HttpStatus.CREATED).body(updatedCityDTO);
	}

	@GetMapping("/all")
	public ResponseEntity<?> getAllCitys() {
		List<CityResponseDTO> cityDTOs = cityService.getAllCitys();
		log.info("Ciry Controller - Get All Citys");
		
		return ResponseEntity.ok(cityDTOs);
	}

	@GetMapping("/state/{stateId}")
	public ResponseEntity<List<CityResponseDTO>> getAllCitiesByStateId(@PathVariable Long stateId) {
		List<CityResponseDTO> cityDTOs = cityService.getAllCitiesByStateId(stateId);
		log.info("City Controller - Get All Citys by given State Id");
		return new ResponseEntity<>(cityDTOs, HttpStatus.OK);

	}
}
