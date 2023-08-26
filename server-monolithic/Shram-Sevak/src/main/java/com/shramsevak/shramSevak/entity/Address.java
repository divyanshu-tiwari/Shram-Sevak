package com.shramsevak.shramSevak.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "customer_addresses")
@NoArgsConstructor
@AllArgsConstructor
public class Address extends BaseEntity {

    @Column(name = "lane1")
    private String lane1;

    @Column(name = "lane2")
    private String lane2;

    @Column(name = "lane3")
    private String lane3;

    @Column(name = "land_mark", nullable = true)
    private String landMark;

    // RELATIONS
    @ManyToOne
    @JoinColumn(name = "locality_id")
    private Locality locality;
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    
}
