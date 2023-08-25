package com.shramsevak.shramSevak.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CustomerResponceDto;
import com.shramsevak.shramSevak.dto.CustomerSignUpRequest;

import com.shramsevak.shramSevak.dto.SigninRequest;
import com.shramsevak.shramSevak.entity.Customer;

import com.shramsevak.shramSevak.service.CustomerService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
@RestController
@Slf4j
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {
	
	@Autowired
	private CustomerService custService;
	
	@Autowired
	private ModelMapper mapper;
	

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> registerCustomer(@RequestBody @Valid CustomerSignUpRequest newCustomer) {
    	
    		System.out.println(newCustomer);
        ApiResponse response = custService.registerCustomer(newCustomer);
        return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
    	
    }
    
    @GetMapping("/getCustomer/{id}")
    public ResponseEntity<?> getCustomerDetailsById(@PathVariable Long id){
    	return ResponseEntity.ok(custService.getCustomerDetails(id));
    }
    
    @GetMapping
	public ResponseEntity<?> getAllCustPaginated(
			@RequestParam(defaultValue = "0", required = false) int pageNumber,
		    @RequestParam(defaultValue = "3", required = false) int pageSize)
{
		System.out.println("in get all customers" +pageNumber+" "+pageSize);
		List<CustomerResponceDto> list = custService.
				getAllCustomers(pageNumber,pageSize);
		if (list.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		
		return ResponseEntity.ok(list);
	}


    @DeleteMapping("/deletePermanent/{Id}")
	public ResponseEntity<?> deleteCustomerPermanently(@PathVariable Long Id) {
		log.info("Worker Controller - delete customer");
		return new ResponseEntity<>(custService.deleteByIdPermanently(Id), HttpStatus.OK);
	}
    
    @PutMapping("/delete/{Id}")
	public ResponseEntity<?> deleteCustomer(@PathVariable Long Id) {
		log.info("Worker Controller - delete customer temparary");
		return new ResponseEntity<>(custService.deleteById(Id), HttpStatus.OK);

	}
    
    @PostMapping("/signin")
	public ResponseEntity<?> customerLogin(@RequestBody @Valid SigninRequest request) {
		System.out.println("Customer login " + request);
		
			return new ResponseEntity<>(custService.authenticate(request),
					HttpStatus.OK);
		}
	
    
    
    
    
}