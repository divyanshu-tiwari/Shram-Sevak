package com.shramsevak.shramSevak.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "orders")
public class Order extends BaseEntity  {
	@Column(nullable = false, length = 75)
	private String title;
	
	@Column(nullable = false)
	private String description;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private OrderStatus status;
	
	@Column(nullable = false)
	private LocalDateTime startTime;
	
	@Column(nullable = false)
	private LocalDateTime endTime;
	
	@Column(nullable = false)
	private Long price;
	
	@JsonProperty(access = Access.READ_ONLY)
	@Embedded
	private Transaction transaction;
	
	// RELATIONS
	@JsonProperty(access = Access.READ_ONLY)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "customer_id", nullable = false)
	private Customer customer;
	
	@JsonProperty(access = Access.READ_ONLY)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "worker_id", nullable = true)
	private Worker worker;
	
}
