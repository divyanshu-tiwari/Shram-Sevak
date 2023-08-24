package com.shramsevak.shramSevak.service;

import com.shramsevak.shramSevak.dto.WorkerRegistrationDto;

public interface WorkerService {

	String register(WorkerRegistrationDto workerDto);
	
	String deleteByIdPermanently(Long id);

	String deleteById(Long id);

}
