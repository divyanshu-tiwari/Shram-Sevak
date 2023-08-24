package com.shramsevak.shramSevak.dto;

import jakarta.annotation.Nonnull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminDto {

	@Nonnull
	private String userName;

	@Nonnull
	private String password;

	
}
