package com.shramsevak.shramSevak.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shramsevak.shramSevak.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

	public List<Order> findByWorkerId(Long workerId);
	public List<Order> findByCustomerId(Long customerId);
}
