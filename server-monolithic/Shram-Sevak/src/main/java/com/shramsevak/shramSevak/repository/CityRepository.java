package com.shramsevak.shramSevak.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shramsevak.shramSevak.entity.City;

public interface CityRepository extends JpaRepository <City,Long> {
	public List<City> findByStateId(Long stateId);
}
