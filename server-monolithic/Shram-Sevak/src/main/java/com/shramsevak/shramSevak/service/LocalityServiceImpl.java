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
import jakarta.validation.Valid;

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
		City city = cityRepo.findById(localityDTO.getCityId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid City Id"));
		Locality localityEntity = mapper.map(localityDTO, Locality.class);
		city.addLocality(localityEntity);
		Locality savedLocality = localityRepo.save(localityEntity);
		return new ApiResponse("Locality " + savedLocality.getLocality() + " Added Successfully...");
	}

	@Override
	public List<LocalityResponceDTO> getAllLocalitiesByCityId(Long id) {
		List<Locality> localities = localityRepo.findByCityId(id);
		localities.stream().forEach(locality -> locality.getLocality());
		return localities.stream().map(locality -> mapper.map(locality, LocalityResponceDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public Long getPin(Long id) {
		Locality locality = localityRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Locality Id"));
		Long pinCode = locality.getPincode();
		return pinCode;
	}

	@Override
	public LocalityResponceDTO getLocalityById(Long id) {

		Locality locality = localityRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Locality ID"));
		return mapper.map(locality, LocalityResponceDTO.class);
	}

	@Override
	public List<LocalityResponceDTO> getAllLocalies() {
		return localityRepo.findAll().stream().map(locality -> mapper.map(locality, LocalityResponceDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public ApiResponse deleteLocalityById(Long id) {
		Locality locality = localityRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Locality ID"));
		localityRepo.delete(locality);
		return new ApiResponse("Locality " + locality.getLocality() + "Delete Successfully");
	}

	@Override
	public ApiResponse deleteAllLocalities() {
		localityRepo.deleteAll();
		return new ApiResponse("All Locality deleted successfully");
	}

	@Override
	public LocalityResponceDTO updateLocality(Long localityId, @Valid LocalityDTO localityDTO) {
		Locality locality = localityRepo.findById(localityId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Locality ID"));
		City city = cityRepo.findById(localityDTO.getCityId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid City Id"));
		mapper.map(localityDTO, locality);
		city.addLocality(locality);
		return mapper.map(locality, LocalityResponceDTO.class);
	}
}
