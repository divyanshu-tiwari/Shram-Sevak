package com.shramsevak.orderService.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "services")
public class Order {
	@Id
	private Long orderId;
	
	@Column(nullable = false)
	private String orderTitle;
	
	@Column(nullable = false)
	private String description;
	
	@Column(nullable = false)
	private OrderStatus orderStatus;
	
	@Column(nullable = false)
	private LocalDateTime startTime;
	
	@Column(nullable = false)
	private LocalDateTime endTime;
	
	@Column(nullable = false)
	private Long transactionId;
	
	@Column(nullable = false)
	private Long customerId;
	
	@Column(nullable = false)
	private Long workerId;

}
