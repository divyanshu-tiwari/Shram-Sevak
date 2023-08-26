package com.shramsevak.shramSevak.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shramsevak.shramSevak.dto.AdminSigninDTO;
import com.shramsevak.shramSevak.service.AdminService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin
@RequestMapping("/admin")
@Slf4j
public class AdminController {

	@Autowired
	AdminService adminService;

	@PostMapping("/register")
	public ResponseEntity<?> registerAdmin(@RequestBody @Valid AdminSigninDTO adminDetails) {
		log.info("Admin Controller - register admin");
		return new ResponseEntity<>(adminService.register(adminDetails), HttpStatus.CREATED);
	}

	@PostMapping("/signin")
	public ResponseEntity<?> adminLogin(@RequestBody @Valid AdminSigninDTO adminCredentials) {
		log.info("Admin Controller - sign admin");
		return new ResponseEntity<>(adminService.signin(adminCredentials), HttpStatus.OK);
	}
	 
	@GetMapping("/admin/view/{Id}")
	public ResponseEntity<?> viewAdmin(@PathVariable Long Id) {
		log.info("Admin Controller - view admin");
		return new ResponseEntity<>(adminService.getAdminById(Id), HttpStatus.OK);
	}

	@GetMapping("/admin/view")
	public ResponseEntity<?> viewAllAdmin() {
		log.info("Admin Controller - view all admin");
		return new ResponseEntity<>(adminService.getListOfAllAdmin(), HttpStatus.OK);
	}

	@DeleteMapping("/admin/{Id}")
	public ResponseEntity<?> deleteAdmin(@PathVariable Long Id) {
		log.info("Admin Controller - delete admin");
		return new ResponseEntity<>(adminService.deleteById(Id), HttpStatus.OK);
	}

}
