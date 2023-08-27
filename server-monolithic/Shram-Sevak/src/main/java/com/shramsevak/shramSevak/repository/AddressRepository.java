package com.shramsevak.shramSevak.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shramsevak.shramSevak.entity.Address;

public interface AddressRepository extends JpaRepository<Address,Long> {

}
