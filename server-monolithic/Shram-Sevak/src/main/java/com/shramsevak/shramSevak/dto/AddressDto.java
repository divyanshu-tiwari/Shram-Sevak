package com.shramsevak.shramSevak.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressDto {
	private String lane1;
	private String lane2;
	private String lane3;
	private String landMark;
	private Long localityId;
	private Long CustomerId;
}
