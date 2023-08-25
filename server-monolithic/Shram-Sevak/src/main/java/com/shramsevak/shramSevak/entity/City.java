package com.shramsevak.shramSevak.entity;


import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cities")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class City extends BaseEntity {
    
	@Column(nullable = false, length = 50)
    private String city;
	
	@ManyToOne
	@JoinColumn(name = "state_id")
    private State state;
    
    @OneToMany(mappedBy = "city", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Locality> localities;

    // HELPER METHOD
    public void addLocality(Locality locality) {
    	localities.add(locality);
    	locality.setCity(this);
    }
    
    public void removeLocality(Locality locality) {
    	localities.remove(locality);
    	locality.setCity(null);
    }
    
}

