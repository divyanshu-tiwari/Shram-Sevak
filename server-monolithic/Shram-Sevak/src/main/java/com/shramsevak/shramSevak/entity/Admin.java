package com.shramsevak.shramSevak.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
public class Admin extends BaseEntity implements ShramSevakUser{
	
	@Column(length = 10, nullable = false)
	private String userName;
	
	@Column(nullable = false)
	private String password;

	@Enumerated(EnumType.STRING)
	private UserRole role;

	// FOR SECURITY CONFIGURATION
	@Override
	public ShramSevakUser getUser() {
		return this;
	}

	@Override
	public String getUsername() {
		return userName;
	}

	@Override
	public Set<Role> getRoles() {
		Set<Role> roles = new HashSet<>();
		roles.add(new Role(this.role));
		return roles;
	}

	@Override
	public String getName() {
		return userName;
	}
	
	
	
}
