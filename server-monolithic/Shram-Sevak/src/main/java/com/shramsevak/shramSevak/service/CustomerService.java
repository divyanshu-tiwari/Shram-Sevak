package com.shramsevak.shramSevak.service;

import java.util.List;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CustomerResponceDto;
import com.shramsevak.shramSevak.dto.CustomerSignUpRequest;
import com.shramsevak.shramSevak.dto.CustomerUpdateDto;
import com.shramsevak.shramSevak.dto.SigninRequest;
import com.shramsevak.shramSevak.dto.SigninResponse;

import jakarta.validation.Valid;

public interface CustomerService {
	ApiResponse registerCustomer(CustomerSignUpRequest customer);

	String deleteByIdPermanently(Long Id);

	String deleteById(Long id);


	SigninResponse authenticate(@Valid SigninRequest request);

	CustomerResponceDto getCustomerDetails(Long id) ;

	List<CustomerResponceDto> getAllCustomers(int pageNumber, int pageSize);


	ApiResponse updateCustomer( CustomerUpdateDto customerDto);

	ApiResponse suspendCustomer(Long customerId);

	ApiResponse activateCustomer(Long customerId);


}
