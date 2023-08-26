package com.shramsevak.shramSevak.service;

import java.util.List;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.LocalityDTO;
import com.shramsevak.shramSevak.dto.LocalityResponceDTO;

import jakarta.validation.Valid;

public interface LocalityService {
	
	ApiResponse addLocality( @Valid LocalityDTO localityDTO);
	List<LocalityResponceDTO>getAllLocalitiesByCityId(Long id);
	Long getPin(Long id);

}
