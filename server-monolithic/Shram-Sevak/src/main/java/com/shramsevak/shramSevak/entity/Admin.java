package com.shramsevak.shramSevak.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
	
	@Column(length = 20, nullable = false)
	private String password;

	@ManyToMany 
	@JoinTable(name = "user_roles", 
	joinColumns = @JoinColumn(name = "user_id"), 
	inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	// FOR SECURITY CONFIGURATION
	@Override
	public ShramSevakUser getUser() {
		return this;
	}

	@Override
	public String getUsername() {
		return userName;
	}
	
	
	
}
