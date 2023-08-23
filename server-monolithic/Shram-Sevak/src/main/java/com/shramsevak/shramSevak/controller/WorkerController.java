package com.shramsevak.shramSevak.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shramsevak.shramSevak.dto.WorkerRegistrationDto;
import com.shramsevak.shramSevak.service.WorkerService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/worker")
@Slf4j
public class WorkerController {

	@Autowired
	private WorkerService workerService;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerWorker(@RequestBody @Valid WorkerRegistrationDto workerDto) {
		log.info("Worker Controller - register worker");
		return new ResponseEntity<>(workerService.register(workerDto), HttpStatus.CREATED);
	}
	

	@DeleteMapping("/worker/{Id}")
	public ResponseEntity<?> deleteWorker(@PathVariable Long Id) {
		log.info("Worker Controller - delete worker");
		return new ResponseEntity<>(workerService.deleteById(Id), HttpStatus.OK);
	}
	
	@PutMapping("/workerTemp/{Id}")
	public ResponseEntity<?> deleteWorkerTemp(@PathVariable Long Id) {
		log.info("Worker Controller - delete worker temparary");
		return new ResponseEntity<>(workerService.deleteByIdTemp(Id), HttpStatus.OK);
	}
}
