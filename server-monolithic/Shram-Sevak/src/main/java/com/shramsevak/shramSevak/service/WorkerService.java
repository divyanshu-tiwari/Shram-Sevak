package com.shramsevak.shramSevak.service;


import java.time.LocalDateTime;
import java.util.List;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.OrderResponseDTO;
import com.shramsevak.shramSevak.dto.SigninRequest;
import com.shramsevak.shramSevak.dto.SigninResponse;
import com.shramsevak.shramSevak.dto.WorkerLocalityRequestDTO;
import com.shramsevak.shramSevak.dto.WorkerRegistrationDto;
import com.shramsevak.shramSevak.dto.WorkerUpdateRequestDto;
import com.shramsevak.shramSevak.dto.WorkerUpdateResponceDto;
import com.shramsevak.shramSevak.dto.WorkerResponseDTO;
import com.shramsevak.shramSevak.dto.WorkerSkillsDTO;

import jakarta.validation.Valid;

public interface WorkerService {

	WorkerResponseDTO register(WorkerRegistrationDto workerDto);
	
	WorkerUpdateResponceDto updateWorker(WorkerUpdateRequestDto worker);
	
	String deleteByIdPermanently(Long id);

	String deleteById(Long id);
	
	SigninResponse authenticate(@Valid SigninRequest request);

	WorkerResponseDTO getWorkerDetails(Long id);

	List<WorkerResponseDTO> getAllWorkers(int pageNumber, int pageSize);
	
	List<WorkerResponseDTO> getAvailableWorkersBySlotAndSkill(Long skillId, LocalDateTime startTime, LocalDateTime endTime, int pageNumber, int pageSize);
	List<OrderResponseDTO> getAllConfirmedByWorkerId(Long workerId);
	ApiResponse updateSkillsByWorkerId(WorkerSkillsDTO workerSkills);
	ApiResponse updateLocalityByWorkerIdAndLocalityId(WorkerLocalityRequestDTO workerLocality);

}
