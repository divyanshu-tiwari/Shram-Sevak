package com.shramsevak.shramSevak.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SigninRequest {
	@NotBlank(message = "Contact can't be blank")
	private String contact;
	@NotBlank
	@Size(min = 8, max = 20, message = "invalid password length")
	private String password;
}
