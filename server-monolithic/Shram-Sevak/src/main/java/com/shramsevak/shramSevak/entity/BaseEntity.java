package com.shramsevak.shramSevak.entity;

import jakarta.persistence.*;
import lombok.*;


@MappedSuperclass // to tell hib , not to create any tables n other entities will extend from it
@Getter
@Setter
public class BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
}
