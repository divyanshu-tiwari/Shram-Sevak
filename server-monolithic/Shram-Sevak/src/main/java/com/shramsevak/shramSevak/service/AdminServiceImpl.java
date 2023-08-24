package com.shramsevak.shramSevak.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shramsevak.shramSevak.customException.AdminException;
import com.shramsevak.shramSevak.customException.ResourceNotFoundException;
import com.shramsevak.shramSevak.dto.AdminDto;
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
	public String register(@Valid AdminDto adminDto) {
		Admin admin = mapper.map(adminDto, Admin.class);
		adminRepo.save(admin);
		return "Admin added successfully";
	}
	
	@Override
	public String signin(@Valid AdminDto adminDto) {
		Admin customer = adminRepo.findBy(adminDto.getUserName(), adminDto.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Bad Credentials , Invalid Login!!!!!!!!!!!!!"));
		Admin admin = mapper.map(adminDto, Admin.class);
		return "Signin Successfull";
	}
	
	@Override
	public String deleteById(Long id) {
		Admin admin = adminRepo.findById(id).orElseThrow(() -> new AdminException("Invalid admin ID"));
		adminRepo.delete(admin);
		return "Admin with username " + admin.getUserName() + " deleted Permanantly!";
	}

	@Override
	public String getAdminById(Long id) {
		Admin admin = adminRepo.findById(id).orElseThrow(() -> new AdminException("Invalid admin ID"));
		return "Admin with username " + admin.getUserName() + " is Found.";
	}

	@Override
	public List<Admin> getListOfAllAdmin() {
		List<Admin> adminList = adminRepo.findAll();
		if(null == adminList || adminList.isEmpty()) {
			throw new AdminException("No Admins available");
		}
		return adminList;
	}

}
