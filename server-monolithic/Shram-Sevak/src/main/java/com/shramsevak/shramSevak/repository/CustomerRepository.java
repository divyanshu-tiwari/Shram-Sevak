package com.shramsevak.shramSevak.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shramsevak.shramSevak.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer,Long> {

}
