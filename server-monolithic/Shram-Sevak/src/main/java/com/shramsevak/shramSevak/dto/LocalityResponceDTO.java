package com.shramsevak.shramSevak.dto;
import jakarta.annotation.Nonnull;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class LocalityResponceDTO {
	
	@Nonnull
	private Long id;
	
	@Nonnull
	private String locality;
	
	@Nonnull
	@Size(min = 6, max = 6, message = "pinCode must be of 6 digits")
	@Pattern(regexp = "^\\d{6}$")
	private Long pincode;

}
