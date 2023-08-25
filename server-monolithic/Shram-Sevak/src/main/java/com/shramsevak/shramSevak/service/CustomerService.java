package com.shramsevak.shramSevak.service;

import java.util.List;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CustomerResponceDto;
import com.shramsevak.shramSevak.dto.CustomerSignUpRequest;
import com.shramsevak.shramSevak.dto.CustomerUpdateDto;
import com.shramsevak.shramSevak.entity.Customer;

public interface CustomerService {
	ApiResponse registerCustomer(CustomerSignUpRequest customer);

	String deleteByIdPermanently(Long Id);

	String deleteById(Long id);

	CustomerResponceDto getCustomerDetails(Long id) ;

	List<CustomerResponceDto> getAllCustomers(int pageNumber, int pageSize);

	ApiResponse updateCustomer( CustomerUpdateDto customerDto);

}
