package com.shramsevak.shramSevak.service;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CustomerSignUpRequest;
import com.shramsevak.shramSevak.entity.Customer;

public interface CustomerService {
	ApiResponse registerCustomer(CustomerSignUpRequest customer);

}
