package com.shramsevak.shramSevak.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shramsevak.shramSevak.dto.AddressDto;
import com.shramsevak.shramSevak.dto.AddressUpdateDto;
import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.entity.Address;
import com.shramsevak.shramSevak.entity.Customer;
import com.shramsevak.shramSevak.entity.Locality;
import com.shramsevak.shramSevak.repository.AddressRepository;
import com.shramsevak.shramSevak.repository.CustomerRepository;
import com.shramsevak.shramSevak.repository.LocalityRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
@Transactional
public class AddressServiceImpl implements AddressService {
	
	@Autowired
	private AddressRepository addressRepo;
	
	@Autowired
	private CustomerRepository customerRepo;
	
	@Autowired
	private LocalityRepository localityRepo;
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public ApiResponse addAddress(@Valid AddressDto addressDtO) {
		Address address=mapper.map(addressDtO, Address.class);
		Locality locality=localityRepo.findById(addressDtO.getLocalityId()).orElseThrow(() -> new RuntimeException("Invalid locality ID"));
		Customer customer=customerRepo.findById(addressDtO.getCustomerId()).orElseThrow(() -> new RuntimeException("Invalid Customer ID"));
		addressRepo.save(address);
		locality.addAddress(address);
		customer.addAddress(address);
		return  new ApiResponse(" Address Added Successfully...");
	}

	@Override
	public ApiResponse deleteAddress(Long id) {
		Address address=addressRepo.findById(id).orElseThrow(() -> new RuntimeException("Invalid address ID"));
		addressRepo.delete(address);
		return new ApiResponse(" Address deleted Successfully...");
	}

	@Override
	public ApiResponse updateAddress(@Valid AddressUpdateDto addressDto) {
		
		Address address = addressRepo.findById(addressDto.getAddressId())
                .orElseThrow(() -> new RuntimeException("Address not found with id: " + addressDto.getAddressId()));
		 if (addressDto.getLane1() != null) {
	            address.setLane1(addressDto.getLane1());
	        }
	        if (addressDto.getLane2() != null) {
	            address.setLane2(addressDto.getLane2());
	        }
	        if (addressDto.getLane3() != null) {
	            address.setLane3(addressDto.getLane3());
	        }
	        if (addressDto.getLandMark() != null) {
	            address.setLandMark(addressDto.getLandMark());
	        }
	        if (addressDto.getLocalityId() != null) {
	        	Locality locality=localityRepo.findById(addressDto.getLocalityId()).orElseThrow(() -> new RuntimeException("Invalid locality ID"));
	        	locality.addAddress(address);
	        }
	        if (addressDto.getCustomerId() != null) {
	        	Customer customer=customerRepo.findById(addressDto.getCustomerId()).orElseThrow(() -> new RuntimeException("Invalid Customer ID"));
	        	customer.addAddress(address);
	        }
		return new ApiResponse(" Address updated Successfully...");
	}
	}
	
	


