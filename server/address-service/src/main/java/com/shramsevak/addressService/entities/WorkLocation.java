package com.shramsevak.addressService.entities;

import java.util.List;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "work_locations")
@Getter
@Setter
public class WorkLocation {
    @Id
    @Column(name = "pincode")
    private Long pincode;
    
    @Column(name = "work_location_name")
    private String workLocationName;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private Location city;

    @OneToMany(mappedBy = "workLocation")
    private List<CustomerAddress> customerAddresses;

}






