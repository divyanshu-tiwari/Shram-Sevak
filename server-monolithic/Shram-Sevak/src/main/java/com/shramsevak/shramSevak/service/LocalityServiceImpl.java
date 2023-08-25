package com.shramsevak.shramSevak.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shramsevak.shramSevak.customException.ResourceNotFoundException;
import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.LocalityDTO;
import com.shramsevak.shramSevak.dto.LocalityResponceDTO;
import com.shramsevak.shramSevak.entity.City;
import com.shramsevak.shramSevak.entity.Locality;
import com.shramsevak.shramSevak.repository.CityRepository;
import com.shramsevak.shramSevak.repository.LocalityRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class LocalityServiceImpl implements LocalityService {
	
	@Autowired
	private LocalityRepository localityRepo;
	
	@Autowired
	private CityRepository cityRepo;

	@Autowired
	private ModelMapper mapper;
	
	
	
	@Override
	public ApiResponse addLocality(LocalityDTO localityDTO) {
		City city = cityRepo.findById(localityDTO.getCity())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid City Id"));
		Locality localityEntity = mapper.map(localityDTO, Locality.class);
		city.addLocality(localityEntity);
		Locality savedLocality = localityRepo.save(localityEntity);
		return new ApiResponse("Locality " + savedLocality.getLocality() + " Added Successfully...");
	}
		
	@Override
	public List<LocalityResponceDTO> getAllLocalitiesByCityId(Long id) {
		List<Locality> localities =localityRepo.findByCityId(id);
		localities.stream().forEach(locality -> locality.getLocality());
		return localities.stream()
				.map(locality -> mapper.map(locality, LocalityResponceDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public Long getPin(Long id) {
		Locality locality=localityRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid Locality Id"));
		Long pinCode=locality.getPincode();
		return pinCode;
	}
	
}

