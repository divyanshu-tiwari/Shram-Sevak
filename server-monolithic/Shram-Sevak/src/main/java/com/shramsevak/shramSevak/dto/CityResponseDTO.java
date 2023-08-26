package com.shramsevak.shramSevak.dto;

import jakarta.annotation.Nonnull;
import lombok.Data;

@Data
public class CityResponseDTO {
	@Nonnull
	private Long id;
	
	@Nonnull
	private String city;
}
