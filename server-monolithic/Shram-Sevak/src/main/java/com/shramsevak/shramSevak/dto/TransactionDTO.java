package com.shramsevak.shramSevak.dto;

import java.time.LocalDateTime;

import com.shramsevak.shramSevak.entity.TransactionStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionDTO {
	private Long transactionId;
	private TransactionStatus transactionStatus;
	private LocalDateTime transactionTimestamp;
}
