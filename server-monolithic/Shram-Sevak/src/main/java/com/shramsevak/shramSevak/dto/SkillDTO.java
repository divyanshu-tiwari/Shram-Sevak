package com.shramsevak.shramSevak.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import jakarta.annotation.Nonnull;
import lombok.AllArgsConstructor;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class SkillDTO {
	@Nonnull
	private Long id;
	@Nonnull
	private String skillName;
	@Nonnull
	private Long categoryId;	
}
