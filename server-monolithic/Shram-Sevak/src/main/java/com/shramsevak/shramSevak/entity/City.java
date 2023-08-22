package com.shramsevak.shramSevak.entity;


import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "cities")
@Getter
@Setter
public class City extends BaseEntity {
    
	@Column(nullable = false, length = 50)
    private String city;
	
	@ManyToOne
	@JoinColumn(name = "state_id")
    private State state;
    
    @OneToMany(mappedBy = "city", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Locality> localities;
    
}

