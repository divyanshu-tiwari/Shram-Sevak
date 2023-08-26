package com.shramsevak.shramSevak.service;

import java.util.List;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CityDTO;
import com.shramsevak.shramSevak.dto.CityResponseDTO;

import jakarta.validation.Valid;

public interface CityService {
	ApiResponse addCity( @Valid CityDTO state);

	CityDTO getCityById(Long id);

	ApiResponse deleteCityById(Long id);

	ApiResponse deleteAllCitys();

	CityDTO updateCity(Long stateId, @Valid CityDTO stateDTO);

	List<CityResponseDTO> getAllCitys();
	
	List<CityResponseDTO>getAllCitiesByStateId(Long id);

}
