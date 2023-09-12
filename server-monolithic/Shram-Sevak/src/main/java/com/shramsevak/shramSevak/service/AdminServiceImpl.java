package com.shramsevak.shramSevak.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shramsevak.shramSevak.customException.AdminException;
import com.shramsevak.shramSevak.customException.ResourceNotFoundException;
import com.shramsevak.shramSevak.dto.AdminDTO;
import com.shramsevak.shramSevak.dto.AdminSigninDTO;
import com.shramsevak.shramSevak.dto.AdminSigninResponseDTO;
import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.entity.Admin;
import com.shramsevak.shramSevak.entity.UserRole;
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
	
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public AdminSigninResponseDTO register(@Valid AdminSigninDTO adminDetails) {
		Admin admin = new Admin();
		admin.setUserName(adminDetails.getUserName());
		admin.setPassword(encoder.encode(adminDetails.getPassword()));
		admin.setRole(UserRole.ROLE_ADMIN);
		adminRepo.save(admin);
		return mapper.map(admin, AdminSigninResponseDTO.class);
	}
	
	@Override
	public AdminSigninResponseDTO signin(@Valid AdminSigninDTO adminCredentials) {
		Admin admin = adminRepo.findByUserNameAndPassword(adminCredentials.getUserName(), adminCredentials.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("AUTHENTICATION FAILED : Incorrect user name or password"));
		return mapper.map(admin, AdminSigninResponseDTO.class);
		
	}
	
	@Override
	public ApiResponse deleteById(Long id) {
		Admin admin = adminRepo.findById(id).orElseThrow(() -> new AdminException("Invalid admin ID"));
		adminRepo.delete(admin);
		return new ApiResponse("Admin with username " + admin.getUsername() + " deleted Permanantly!");
	}

	@Override
	public AdminDTO getAdminById(Long id) {
		Admin admin = adminRepo.findById(id).orElseThrow(() -> new AdminException("Invalid admin ID"));
		return mapper.map(admin, AdminDTO.class);
	}

	@Override
	public List<AdminDTO> getListOfAllAdmin() {
		List<Admin> adminList = adminRepo.findAll();
		if(adminList.isEmpty())
			throw new AdminException("No Admins available");
		return adminList.stream().map(admin -> mapper.map(admin, AdminDTO.class)).collect(Collectors.toList());
	}

}
