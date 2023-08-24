package com.shramsevak.shramSevak.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "states")
@Getter
@Setter
public class State extends BaseEntity{
	
	@Column(nullable = false, length = 25)
	private String state;
	
	// RELATION
	@OneToMany(mappedBy = "state", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<City> cities = new ArrayList<>();
	
	
	// HELPER METHODS
	public void addCity(City city) {
		cities.add(city);
		city.setState(this);
	}
	
	public void removeCity(City city) {
		cities.remove(city);
		city.setState(null);
	}
	
}
