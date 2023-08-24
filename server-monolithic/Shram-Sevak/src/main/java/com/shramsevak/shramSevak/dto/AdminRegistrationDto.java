package com.shramsevak.shramSevak.dto;

import jakarta.annotation.Nonnull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminRegistrationDto {

	@Nonnull
	private String userName;

	@Nonnull
	private String password;

	
}
