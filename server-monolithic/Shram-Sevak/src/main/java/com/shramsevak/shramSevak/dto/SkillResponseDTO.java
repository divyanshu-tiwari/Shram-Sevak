package com.shramsevak.shramSevak.dto;

import jakarta.annotation.Nonnull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SkillResponseDTO {
	
	@Nonnull
    private Long id;
    

	@Nonnull
	private String skillName;

}
