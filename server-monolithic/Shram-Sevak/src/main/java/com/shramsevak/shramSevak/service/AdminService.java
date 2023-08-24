package com.shramsevak.shramSevak.service;

import com.shramsevak.shramSevak.dto.AdminRegistrationDto;

import jakarta.validation.Valid;

public interface AdminService {

	String register(@Valid AdminRegistrationDto adminDto);

	
}
