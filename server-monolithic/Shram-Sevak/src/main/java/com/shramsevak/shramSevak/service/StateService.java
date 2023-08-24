package com.shramsevak.shramSevak.service;

import java.util.List;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.StateDTO;

import jakarta.validation.Valid;

public interface StateService {
	ApiResponse addState( @Valid StateDTO state);

	StateDTO getStateById(Long id);

	ApiResponse deleteStateById(Long id);

	ApiResponse deleteAllStates();

	StateDTO updateState(Long stateId, @Valid StateDTO stateDTO);

	List<StateDTO> getAllStates();

}
