package com.shramsevak.addressService.entities;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "customer_addresses")
public class CustomerAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Long addressId;

    @ManyToOne
    @JoinColumn(name = "pincode", referencedColumnName = "pincode")
    private WorkLocation workLocation;

    @Column(name = "lane1")
    private String lane1;

    @Column(name = "lane2")
    private String lane2;

    @Column(name = "lane3")
    private String lane3;

    @Column(name = "land_mark")
    private String landMark;

    @Column(name = "customer_id", nullable = true)
    private Long customerId;

    // Other attributes, getters, and setters
}


