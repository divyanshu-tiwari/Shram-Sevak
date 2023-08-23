package com.shramsevak.shramSevak.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CustomerSignUpRequest;
import com.shramsevak.shramSevak.entity.Customer;
import com.shramsevak.shramSevak.service.CustomerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/customer")
//@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {
	
	@Autowired
	private CustomerService custService;
	
	@Autowired
	private ModelMapper mapper;
	

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> registerCustomer(@RequestBody @Valid CustomerSignUpRequest newCustomer) {
    	try{
    		System.out.println(newCustomer);
        ApiResponse response = custService.registerCustomer(newCustomer);
        return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
    	}
    	catch(Exception e)
    	{
            ApiResponse response = new ApiResponse("Customer registration failed.");
            e.printStackTrace();
            return new ResponseEntity<ApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
    
    
    
    
}