package com.shramsevak.shramSevak.security;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.shramsevak.shramSevak.entity.Customer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuppressWarnings("serial")
public class CustomerDetails extends ShramSevakUserDetails {

	private Customer customer;
	
	@Override
	public String getPassword() {
		return customer.getPassword();
	}

	@Override
	public String getUsername() {
		return customer.getContact();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return customer.getRoles()
				.stream()
				.map(role -> new SimpleGrantedAuthority(role.getRoleName().name()))
				.collect(Collectors.toSet());
	}

	
}
