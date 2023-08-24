package com.shramsevak.shramSevak.service;

import java.util.List;

import com.shramsevak.shramSevak.dto.WorkerRegistrationDto;
import com.shramsevak.shramSevak.dto.WorkerResponceDto;

public interface WorkerService {

	String register(WorkerRegistrationDto workerDto);
	
	String deleteByIdPermanently(Long id);

	String deleteById(Long id);

	WorkerResponceDto getWorkerDetails(Long id);

	List<WorkerResponceDto> getAllWorkers(int pageNumber, int pageSize);
	
	

}
