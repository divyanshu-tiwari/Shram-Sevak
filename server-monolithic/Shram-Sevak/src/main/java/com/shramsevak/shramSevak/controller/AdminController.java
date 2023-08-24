package com.shramsevak.shramSevak.controller;

//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.log;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shramsevak.shramSevak.dto.AdminRegistrationDto;
import com.shramsevak.shramSevak.service.AdminService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/admin")
@Slf4j
public class AdminController {

//	POST URI - /admin/create -to create a new admin
//	GET URI - /admin/view - to view list of all admins
//	GET URI - /admin/view/{adminId} - to view details of particular admin
	
	@Autowired
	AdminService adminService;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerAdmin(@RequestBody @Valid AdminRegistrationDto adminDto) {
		//log.info("Admin Controller - register admin");
		return new ResponseEntity<>(adminService.register(adminDto), HttpStatus.CREATED);
	}
	
}
