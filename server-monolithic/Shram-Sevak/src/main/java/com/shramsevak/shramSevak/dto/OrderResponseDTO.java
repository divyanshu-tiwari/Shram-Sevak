package com.shramsevak.shramSevak.dto;

import java.time.LocalDateTime;

import com.shramsevak.shramSevak.entity.OrderStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderResponseDTO {
	private Long id;
	private String title;
	private String description;
	private OrderStatus status;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
}
