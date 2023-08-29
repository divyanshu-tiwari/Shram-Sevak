package com.shramsevak.shramSevak.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shramsevak.shramSevak.customException.ResourceNotFoundException;
import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CityDTO;
import com.shramsevak.shramSevak.dto.CityResponseDTO;
import com.shramsevak.shramSevak.entity.City;
import com.shramsevak.shramSevak.entity.State;
import com.shramsevak.shramSevak.repository.CityRepository;
import com.shramsevak.shramSevak.repository.StateRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CityServiceImpl implements CityService {

	@Autowired
	private CityRepository cityRepo;

	@Autowired
	private StateRepository stateRepo;

	@Autowired
	private ModelMapper mapper;

	@Override
	public ApiResponse addCity(CityDTO cityDTO) {
		State state = stateRepo.findById(cityDTO.getStateId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid State Id"));
		City cityEntity = mapper.map(cityDTO, City.class);
		state.addCity(cityEntity);
		City savedCity = cityRepo.save(cityEntity);
		return new ApiResponse("City " + savedCity.getCity() + " Added Successfully...");
	}

	@Override
	public CityResponseDTO getCityById(Long id) {
		City city = cityRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid City ID"));
		return mapper.map(city, CityResponseDTO.class);
	}

	@Override
	public ApiResponse deleteCityById(Long id) {
		City city = cityRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid City ID"));
		cityRepo.delete(city);
		return new ApiResponse("City " + city.getCity() + " Deleted Successfully...");
	}

	@Override
	public ApiResponse deleteAllCitys() {
		cityRepo.deleteAll();
		return new ApiResponse("All City deleted successfully");
	}

	@Override
	public CityResponseDTO updateCity(Long cityId, CityDTO cityDTO) {
		City city = cityRepo.findById(cityId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid City ID , City Not Found"));
		State state = stateRepo.findById(cityDTO.getStateId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid State ID"));

		mapper.map(cityDTO, city);
		state.addCity(city);
		return mapper.map(city, CityResponseDTO.class);
	}

	@Override
	public List<CityResponseDTO> getAllCitys() {
		return cityRepo
				.findAll()
				.stream()
				.map(city -> mapper.map(city, CityResponseDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<CityResponseDTO> getAllCitiesByStateId(Long stateId) {
		List<City> cities = cityRepo.findByStateId(stateId);
//		Testing purpose only, you can bottom line only
		cities.stream().forEach(System.out::println);
		return cities.stream().map(city -> mapper.map(city, CityResponseDTO.class)).collect(Collectors.toList());
	}

}
