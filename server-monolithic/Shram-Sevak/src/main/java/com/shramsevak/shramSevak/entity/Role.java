package com.shramsevak.shramSevak.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "roles")
@Data
@EqualsAndHashCode(callSuper = false)
public class Role extends BaseEntity{
	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private UserRole roleName;
	
}
