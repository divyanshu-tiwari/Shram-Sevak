package com.shramsevak.shramSevak.dto;

import java.time.LocalDateTime;

import com.shramsevak.shramSevak.entity.OrderStatus;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDTO {
	private long id ;
	@NotEmpty
	private String title;
	@NotEmpty
	private String description;
	private OrderStatus status;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
	private TransactionDTO transaction;
}
