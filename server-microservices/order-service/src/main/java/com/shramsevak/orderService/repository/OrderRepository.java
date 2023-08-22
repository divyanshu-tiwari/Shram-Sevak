package com.shramsevak.orderService.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shramsevak.orderService.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{

}
