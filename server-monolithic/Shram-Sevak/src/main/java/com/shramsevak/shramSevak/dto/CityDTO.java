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
public class CityDTO {
	@Nonnull
	private Long id;
	@Nonnull
	private String city;
	
	@Nonnull
	private Long stateId;

}
