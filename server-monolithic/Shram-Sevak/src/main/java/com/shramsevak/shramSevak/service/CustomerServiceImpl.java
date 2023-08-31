package com.shramsevak.shramSevak.service;

import static com.shramsevak.shramSevak.util.Utils.checkStatusC;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.shramsevak.shramSevak.customException.CustomerException;
import com.shramsevak.shramSevak.customException.ResourceNotFoundException;
import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CustomerResponceDto;
import com.shramsevak.shramSevak.dto.CustomerSignUpRequest;
import com.shramsevak.shramSevak.dto.CustomerUpdateDto;
import com.shramsevak.shramSevak.dto.SigninRequest;
import com.shramsevak.shramSevak.dto.SigninResponse;
import com.shramsevak.shramSevak.entity.Customer;
import com.shramsevak.shramSevak.entity.CustomerStatus;
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
	public ApiResponse registerCustomer(CustomerSignUpRequest newCustomer)
			throws IllegalArgumentException, OptimisticLockingFailureException {

		Customer cust = mapper.map(newCustomer, Customer.class);
		cust.setStatus(CustomerStatus.ACTIVE);
		customerRepo.save(cust);
		return new ApiResponse("Customer registered successfully.");

	}

	@Override
	public String deleteByIdPermanently(Long Id) {
		Customer customer = customerRepo.findById(Id).orElseThrow(() -> new CustomerException("Invalid worker ID"));
		customerRepo.delete(customer);

		return "Worker " + customer.getFirstName() + " " + customer.getLastName() + "'s  details deleted Permanantly!";

	}

	@Override
	public String deleteById(Long id) {
		Customer customer = customerRepo.findById(id).orElseThrow(() -> new CustomerException("Invalid worker ID"));
		checkStatusC(customer);
		customer.setStatus(CustomerStatus.INACTIVE);

		return customer.getFirstName() + " " + customer.getLastName() + "s  details deleted!";

	}

	@Override
	public CustomerResponceDto getCustomerDetails(Long id) {
		Customer cust = customerRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Customer ID!!!"));

		return mapper.map(cust, CustomerResponceDto.class);

	}

	@Override
	public List<CustomerResponceDto> getAllCustomers(int pageNumber, int pageSize) {
		Pageable pageable = PageRequest.of(pageNumber, pageSize);

		List<Customer> custList = customerRepo.findAll(pageable).getContent();
		return custList.stream().map(cust -> mapper.map(cust, CustomerResponceDto.class)).collect(Collectors.toList());

	}

	@Override
	public ApiResponse updateCustomer(CustomerUpdateDto customerDto) {
		Customer customer = customerRepo.findById(customerDto.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Customer ID , Customer not found !!!!"));

		if (customerDto.getFirstName() != null) {
			customer.setFirstName(customerDto.getFirstName());
		}
		if (customerDto.getLastName() != null) {
			customer.setLastName(customerDto.getLastName());
		}
		if (customerDto.getEmail() != null) {
			customer.setEmail(customerDto.getEmail());
		}
		if (customerDto.getContact() != null) {
			customer.setContact(customerDto.getContact());
		}

		customerRepo.save(customer);

		return new ApiResponse("Updated details for  Customer , " + customer.getFirstName());

	}

	public SigninResponse authenticate(@Valid SigninRequest request) {
		Customer customer = customerRepo.findByContactAndPassword(request.getContact(), request.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Bad Credentials , Invalid Login!!!!!!!!!!!!!"));

		return mapper.map(customer, SigninResponse.class);
	}

	@Override
	public ApiResponse suspendCustomer(Long customerId) {
		Customer customer = customerRepo.findById(customerId).orElseThrow(() -> new CustomerException("No such customer found"));
		customer.setStatus(CustomerStatus.SUSPENDED);
		return new ApiResponse("Customer blocked successfully");
	}

	@Override
	public ApiResponse activateCustomer(Long customerId) {
		Customer customer = customerRepo.findById(customerId).orElseThrow(() -> new CustomerException("No such customer found"));
		customer.setStatus(CustomerStatus.ACTIVE);
		return new ApiResponse("Customer blocked successfully");
	}

	
}
