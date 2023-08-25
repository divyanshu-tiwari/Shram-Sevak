package com.shramsevak.shramSevak.dto;

import java.time.LocalDateTime;

import com.shramsevak.shramSevak.entity.OrderStatus;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PlaceOrderDTO {
	
	private String title;
	
	private String description;
	private OrderStatus status;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
//	private Long customerId;
//	private Long workerId;
//	private TransactionDTO transaction;
}
