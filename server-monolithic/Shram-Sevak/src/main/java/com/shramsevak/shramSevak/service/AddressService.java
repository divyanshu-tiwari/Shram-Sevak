package com.shramsevak.shramSevak.service;

import com.shramsevak.shramSevak.dto.AddressDto;
import com.shramsevak.shramSevak.dto.AddressUpdateDto;
import com.shramsevak.shramSevak.dto.ApiResponse;

import jakarta.validation.Valid;

public interface AddressService {

	ApiResponse addAddress(@Valid AddressDto addressDtO);

	ApiResponse deleteAddress(Long id);

	ApiResponse  updateAddress(@Valid  AddressUpdateDto addressDto);

}
