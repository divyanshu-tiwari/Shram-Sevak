package com.shramsevak.shramSevak.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shramsevak.shramSevak.entity.Order;
import com.shramsevak.shramSevak.entity.OrderStatus;

public interface OrderRepository extends JpaRepository<Order, Long> {

	public List<Order> findByWorkerId(Long workerId);
	public List<Order> findByCustomerId(Long customerId);
	public List<Order> findAllByStartTimeIsAndStatus(LocalDateTime startTime, OrderStatus status);
}
