package com.shramsevak.shramSevak.dto;

import jakarta.annotation.Nonnull;
import lombok.Data;

@Data
public class LocalityResponceDTO {

	@Nonnull
	private Long id;
	
	@Nonnull
	private String locality;
	
	@Nonnull
	private Long pincode;
	
}
