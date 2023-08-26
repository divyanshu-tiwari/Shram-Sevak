package com.shramsevak.shramSevak.dto;

import com.shramsevak.shramSevak.entity.Gender;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SigninResponse {
private Long id;
private String firstName;
private String lastName;
private Gender gender;
private String contact;
}
