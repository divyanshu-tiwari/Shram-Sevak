package com.shramsevak.shramSevak.dto;

import com.shramsevak.shramSevak.entity.TransactionStatus;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
public class TransactionUpdateRequestDTO {
	private Long  orderId;
	private String transactionId;
	private TransactionStatus transactionStatus;
}
