package com.shramsevak.shramSevak.service;

import java.util.List;

import com.shramsevak.shramSevak.dto.AdminDTO;
import com.shramsevak.shramSevak.dto.AdminSigninDTO;
import com.shramsevak.shramSevak.dto.AdminSigninResponseDTO;
import com.shramsevak.shramSevak.dto.ApiResponse;

import jakarta.validation.Valid;

public interface AdminService {

	AdminSigninResponseDTO register(@Valid AdminSigninDTO adminDetails);
	
	AdminSigninResponseDTO signin(@Valid AdminSigninDTO adminCredentials);
	
	ApiResponse deleteById(Long id);

	AdminDTO getAdminById(Long id);

	List<AdminDTO> getListOfAllAdmin();
	
}
