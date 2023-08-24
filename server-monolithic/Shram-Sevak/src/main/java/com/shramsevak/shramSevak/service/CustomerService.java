package com.shramsevak.shramSevak.service;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CustomerSignUpRequest;
import com.shramsevak.shramSevak.dto.SigninRequest;
import com.shramsevak.shramSevak.dto.SigninResponse;
import com.shramsevak.shramSevak.entity.Customer;

import jakarta.validation.Valid;

public interface CustomerService {
	ApiResponse registerCustomer(CustomerSignUpRequest customer);

	String deleteByIdPermanently(Long Id);

	String deleteById(Long id);

	SigninResponse authenticate(@Valid SigninRequest request);

}
