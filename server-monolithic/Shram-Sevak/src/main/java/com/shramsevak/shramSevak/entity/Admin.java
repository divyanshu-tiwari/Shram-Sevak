package com.shramsevak.shramSevak.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "password")
@Entity
@Table(name = "admins")
public class Admin extends BaseEntity{
	
	@Column(length = 10, nullable = false)
	private String userName;
	
	@Column(length = 20, nullable = false)
	private String password;

}
