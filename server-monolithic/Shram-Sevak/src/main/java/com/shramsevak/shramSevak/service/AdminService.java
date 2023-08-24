package com.shramsevak.shramSevak.service;

import java.util.List;

import com.shramsevak.shramSevak.dto.AdminDto;
import com.shramsevak.shramSevak.entity.Admin;

import jakarta.validation.Valid;

public interface AdminService {

	String register(@Valid AdminDto adminDto);

	String deleteById(Long id);

	String getAdminById(Long id);

	List<Admin> getListOfAllAdmin();

	
}
