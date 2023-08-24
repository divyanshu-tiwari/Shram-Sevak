package com.shramsevak.shramSevak.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shramsevak.shramSevak.dto.AdminRegistrationDto;
import com.shramsevak.shramSevak.entity.Admin;
import com.shramsevak.shramSevak.repository.AdminRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private AdminRepository adminRepo;

	@Override
	public String register(@Valid AdminRegistrationDto adminDto) {
		Admin admin = mapper.map(adminDto, Admin.class);
		adminRepo.save(admin);
		return "Admin added successfully";
	}

}
