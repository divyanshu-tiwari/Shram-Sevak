package com.shramsevak.shramSevak.security;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.shramsevak.shramSevak.entity.Admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuppressWarnings("serial")
public class AdminDetails extends ShramSevakUserDetails {

	private Admin admin;
	
	@Override
	public String getPassword() {
		return admin.getPassword();
	}

	@Override
	public String getUsername() {
		return admin.getUserName();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return admin.getRoles()
				.stream()
				.map(role -> new SimpleGrantedAuthority(role.getRoleName().name()))
				.collect(Collectors.toSet());
	}

}
