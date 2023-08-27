package com.shramsevak.shramSevak.service;


import com.shramsevak.shramSevak.dto.SigninRequest;
import com.shramsevak.shramSevak.dto.SigninResponse;

import java.util.List;


import com.shramsevak.shramSevak.dto.WorkerRegistrationDto;
import com.shramsevak.shramSevak.dto.WorkerResponceDto;
import com.shramsevak.shramSevak.dto.WorkerUpdateRequestDto;

import jakarta.validation.Valid;

public interface WorkerService {

	WorkerResponceDto register(WorkerRegistrationDto workerDto);
	
	WorkerResponceDto updateWorker(WorkerUpdateRequestDto worker);
	
	String deleteByIdPermanently(Long id);

	String deleteById(Long id);
	
	SigninResponse authenticate(@Valid SigninRequest request);

	WorkerResponceDto getWorkerDetails(Long id);

	List<WorkerResponceDto> getAllWorkers(int pageNumber, int pageSize);
	
	

}
