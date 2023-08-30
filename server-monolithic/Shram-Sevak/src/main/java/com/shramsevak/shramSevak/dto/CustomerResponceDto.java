package com.shramsevak.shramSevak.dto;

import com.shramsevak.shramSevak.entity.CustomerStatus;
import com.shramsevak.shramSevak.entity.Gender;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CustomerResponceDto {

	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String contact;
	private Gender gender;
	private CustomerStatus status;
	private String profilePicturePath;
	
}
