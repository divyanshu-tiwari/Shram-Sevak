package com.shramsevak.shramSevak.service;

import com.shramsevak.shramSevak.dto.WorkerRegistrationDto;

public interface WorkerService {

	String register(WorkerRegistrationDto workerDto);
	
	String deleteById(Long id);

	String deleteByIdTemp(Long id);

}
