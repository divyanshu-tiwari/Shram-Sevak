package com.shramsevak.shramSevak.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CustomerUpdateDto {
    
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String contact;
	 
	 
}
