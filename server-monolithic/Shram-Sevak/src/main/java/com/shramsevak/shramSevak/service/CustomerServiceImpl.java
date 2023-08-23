package com.shramsevak.shramSevak.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CustomerSignUpRequest;
import com.shramsevak.shramSevak.entity.Customer;
import com.shramsevak.shramSevak.repository.CustomerRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {
	
	@Autowired
	private CustomerRepository customerRepo;
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public ApiResponse registerCustomer(CustomerSignUpRequest newCustomer) throws IllegalArgumentException, OptimisticLockingFailureException {
    	
		Customer cust = mapper.map(newCustomer, Customer.class);		
    	customerRepo.save(cust);
		return new ApiResponse("Customer registered successfully.");
    	
	}

}
