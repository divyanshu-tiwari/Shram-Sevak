package com.shramsevak.shramSevak.service;

import java.util.List;
import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.LocalityDTO;
import com.shramsevak.shramSevak.dto.LocalityResponceDTO;

import jakarta.validation.Valid;

public interface LocalityService {

	ApiResponse addLocality(@Valid LocalityDTO localityDTO);

	List<LocalityResponceDTO>getAllLocalitiesByCityId(Long id);
	
	LocalityResponceDTO getLocalityById(Long id);

	List<LocalityResponceDTO> getAllLocalies();

	ApiResponse deleteLocalityById(Long id);

	ApiResponse deleteAllLocalities();

	LocalityResponceDTO updateLocality(Long localityId, @Valid LocalityDTO localityDTO);

	Long getPin(Long id);


}
