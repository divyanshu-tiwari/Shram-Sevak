package com.shramsevak.shramSevak.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shramsevak.shramSevak.entity.Address;
import com.shramsevak.shramSevak.entity.Category;

public interface AaddressRepository extends JpaRepository<Address,Long> {

}
