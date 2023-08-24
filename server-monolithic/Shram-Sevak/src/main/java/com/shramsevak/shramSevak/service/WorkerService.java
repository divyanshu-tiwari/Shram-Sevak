package com.shramsevak.shramSevak.service;

import com.shramsevak.shramSevak.dto.SigninRequest;
import com.shramsevak.shramSevak.dto.SigninResponse;
import com.shramsevak.shramSevak.dto.WorkerRegistrationDto;

import jakarta.validation.Valid;

public interface WorkerService {

	String register(WorkerRegistrationDto workerDto);
	
	String deleteByIdPermanently(Long id);

	String deleteById(Long id);
	
	SigninResponse authenticate(@Valid SigninRequest request);

}
