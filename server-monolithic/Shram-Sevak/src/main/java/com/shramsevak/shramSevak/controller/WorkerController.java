package com.shramsevak.shramSevak.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shramsevak.shramSevak.dto.SigninRequest;
import com.shramsevak.shramSevak.dto.WorkerLocalityRequestDTO;
import com.shramsevak.shramSevak.dto.WorkerRegistrationDto;
import com.shramsevak.shramSevak.dto.WorkerResponseDTO;
import com.shramsevak.shramSevak.dto.WorkerSkillsDTO;
import com.shramsevak.shramSevak.dto.WorkerUpdateRequestDto;
import com.shramsevak.shramSevak.service.WorkerService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/worker")
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class WorkerController {

	@Autowired
	private WorkerService workerService;

	@PostMapping("/register")
	public ResponseEntity<?> registerWorker(@RequestBody @Valid WorkerRegistrationDto workerDto) {
		log.info("Worker Controller - register worker");
		return new ResponseEntity<>(workerService.register(workerDto), HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<?> getAllCustPaginated(@RequestParam(defaultValue = "0", required = false) int pageNumber,
			@RequestParam(defaultValue = "3", required = false) int pageSize) {
		System.out.println("in get all customers" + pageNumber + " " + pageSize);
		List<WorkerResponseDTO> list = workerService.getAllWorkers(pageNumber, pageSize);
		if (list.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

		return ResponseEntity.ok(list);
	}

	@GetMapping("/getWorker/{id}")
	public ResponseEntity<?> getCustomerDetailsById(@PathVariable Long id) {
		return ResponseEntity.ok(workerService.getWorkerDetails(id));
	}

	@DeleteMapping("/deletePermanent/{Id}")
	public ResponseEntity<?> deleteWorkerPermanently(@PathVariable Long Id) {
		log.info("Worker Controller - delete worker");
		return new ResponseEntity<>(workerService.deleteByIdPermanently(Id), HttpStatus.OK);
	}

	@PutMapping("/delete/{Id}")
	public ResponseEntity<?> deleteWorker(@PathVariable Long Id) {
		log.info("Worker Controller - delete worker temparary");
		return new ResponseEntity<>(workerService.deleteById(Id), HttpStatus.OK);
	}

	@PostMapping("/signin")
	public ResponseEntity<?> workerLogin(@RequestBody @Valid SigninRequest request) {
		System.out.println("Worker login " + request);

		return new ResponseEntity<>(workerService.authenticate(request), HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateWorker(@RequestBody @Valid WorkerUpdateRequestDto worker) {
		log.info("worker controller - update worker information");
		return new ResponseEntity<>(workerService.updateWorker(worker), HttpStatus.OK);
	}

	@GetMapping("/available/skill/{skillId}/start/{startTime}/end/{endTime}")
	public ResponseEntity<?> getAvailableWorkers(@PathVariable Long skillId, @PathVariable LocalDateTime startTime,
			@PathVariable LocalDateTime endTime, @RequestParam(defaultValue = "0", required = false) int pageNumber,
			@RequestParam(defaultValue = "3", required = false) int pageSize) {
		return new ResponseEntity<>(
				workerService.getAvailableWorkersBySlotAndSkill(skillId, startTime, endTime, pageNumber, pageSize),
				HttpStatus.OK);
	}

	@GetMapping("/active/{workerId}")
	public ResponseEntity<?> getAllConfirmedByWorkerId(@PathVariable Long workerId) {
		return new ResponseEntity<>(workerService.getAllConfirmedByWorkerId(workerId), HttpStatus.OK);
	}

	@PatchMapping("/skills")
	public ResponseEntity<?> updateSkillsByWorkerId(@RequestBody @Valid WorkerSkillsDTO workerSkills) {
		return new ResponseEntity<>(workerService.updateSkillsByWorkerId(workerSkills), HttpStatus.OK);
	}

	@PatchMapping("/locality")
	public ResponseEntity<?> updateLocalityByWorkerIdAndLocalityId(
			@RequestBody @Valid WorkerLocalityRequestDTO workerLocality) {

		return new ResponseEntity<>(workerService.updateLocalityByWorkerIdAndLocalityId(workerLocality), HttpStatus.OK);

	}
}
