package com.shramsevak.shramSevak.dto;

import jakarta.annotation.Nonnull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class StateDTO {
	
@Nonnull
 private String state;


 private Long id;
 
}
