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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shramsevak.shramSevak.dto.SigninRequest;
import com.shramsevak.shramSevak.dto.WorkerRegistrationDto;
import com.shramsevak.shramSevak.dto.WorkerResponceDto;
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
	
	 @GetMapping("/getWorker/{id}")
	    public ResponseEntity<?> getCustomerDetailsById(@PathVariable Long id){
	    	return ResponseEntity.ok(workerService.getWorkerDetails(id));
	 }
	 
	 @GetMapping
		public ResponseEntity<?> getAllCustPaginated(
				@RequestParam(defaultValue = "0", required = false) int pageNumber,
			    @RequestParam(defaultValue = "3", required = false) int pageSize)
	{
			System.out.println("in get all customers" +pageNumber+" "+pageSize);
			List<WorkerResponceDto> list = workerService.
					getAllWorkers(pageNumber,pageSize);
			if (list.isEmpty())
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			
			return ResponseEntity.ok(list);
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
		
			return new ResponseEntity<>(workerService.authenticate(request),
					HttpStatus.OK);
		}
}
