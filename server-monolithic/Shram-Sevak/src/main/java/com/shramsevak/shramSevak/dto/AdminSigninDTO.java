package com.shramsevak.shramSevak.dto;

import jakarta.annotation.Nonnull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminSigninDTO {

	@Nonnull
	private String userName;

	@Nonnull
	private String password;
	
}
