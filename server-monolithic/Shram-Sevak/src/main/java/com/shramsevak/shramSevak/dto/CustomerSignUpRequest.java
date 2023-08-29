package com.shramsevak.shramSevak.dto;


import com.shramsevak.shramSevak.entity.Gender;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CustomerSignUpRequest {

    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name should not exceed 50 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name should not exceed 50 characters")
    private String lastName;

    //@NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
//    @Size(max = 100, message = "Email should not exceed 100 characters")
    private String email="Email@com";

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password should be at least 8 characters long")
    private String password;

    @NotBlank(message = "Contact is required")
    @Pattern(regexp = "\\d{10}", message = "Contact should be a 10-digit number")
    private String contact;

    @NotBlank(message = "Gender is required")
    private Gender gender;

    
}