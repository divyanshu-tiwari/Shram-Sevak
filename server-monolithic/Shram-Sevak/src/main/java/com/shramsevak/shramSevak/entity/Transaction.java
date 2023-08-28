package com.shramsevak.shramSevak.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Embeddable
public class Transaction  {

	@Column(name = "transaction_id")
	private String transactionId;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "transaction_status")
	private TransactionStatus transactionStatus;
	
	@Column(name = "transaction_time")
	private LocalDateTime transactionTimestamp;
}
