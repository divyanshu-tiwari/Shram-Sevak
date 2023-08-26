package com.shramsevak.shramSevak.dto;

import jakarta.annotation.Nonnull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LocalityResponceDTO {

	@Nonnull
	private Long id;
	
	@Nonnull
	private String locality;
	
	@Nonnull
	private Long pincode;
	
}
