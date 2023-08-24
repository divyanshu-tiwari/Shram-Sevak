package com.shramsevak.shramSevak.service;

import static com.shramsevak.shramSevak.util.Utils.checkStatusC;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import com.shramsevak.shramSevak.customException.CustomerException;
import com.shramsevak.shramSevak.customException.ResourceNotFoundException;
import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CustomerSignUpRequest;
import com.shramsevak.shramSevak.dto.SigninRequest;
import com.shramsevak.shramSevak.dto.SigninResponse;
import com.shramsevak.shramSevak.entity.Customer;
import com.shramsevak.shramSevak.entity.CustomerStatus;
import com.shramsevak.shramSevak.entity.Worker;
import com.shramsevak.shramSevak.entity.WorkerStatus;
import com.shramsevak.shramSevak.repository.CustomerRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

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
		cust.setStatus(CustomerStatus.ACTIVE);
    	customerRepo.save(cust);
		return new ApiResponse("Customer registered successfully.");
    	
	}

	@Override
	public String deleteByIdPermanently(Long Id) {
		Customer customer=customerRepo.findById(Id).orElseThrow(() -> new CustomerException("Invalid worker ID"));
		customerRepo.delete(customer);
		
	  return "Worker " + customer.getFirstName()+" "+customer.getLastName()+ "'s  details deleted Permanantly!";
		
	}

	@Override
	public String deleteById(Long id) {
		Customer customer=customerRepo.findById(id).orElseThrow(() -> new CustomerException("Invalid worker ID"));
		checkStatusC(customer);
		customer.setStatus(CustomerStatus.INACTIVE);
		
		return customer.getFirstName()+" "+customer.getLastName()+"s  details deleted!";
		
	}

	@Override
	public SigninResponse authenticate(@Valid SigninRequest request) {
		Customer customer = customerRepo.findByContactAndPassword(request.getContact(), request.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Bad Credentials , Invalid Login!!!!!!!!!!!!!"));
		
		return mapper.map(customer, SigninResponse.class);
	}
		

}
