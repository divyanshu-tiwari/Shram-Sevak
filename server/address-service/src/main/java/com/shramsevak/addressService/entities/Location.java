package com.shramsevak.addressService.entities;

import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "locations")
@Getter
@Setter
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private Long locationId;

    @Column(unique = true)
    private String state;
    
    @OneToMany(mappedBy = "city")
    private List<WorkLocation> workLocations;
    
   
}







