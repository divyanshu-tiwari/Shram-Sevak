package com.shramsevak.shramSevak.dto;

import java.util.List;

import jakarta.persistence.Column;
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

public class SkillAddDto {
	@Column(nullable=true)
	private List<Long> skillIds;
	
	private Long workerId;

}

