package com.shramsevak.shramSevak.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CreateOrderDTO {
	
	private String title;
	
	private String description;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
	private Long customerId;
	private Long workerId;
	private Long price;
//	private TransactionDTO transaction;
}
