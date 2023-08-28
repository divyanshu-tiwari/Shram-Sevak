package com.shramsevak.shramSevak.security;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.shramsevak.shramSevak.entity.Worker;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuppressWarnings("serial")
public class WorkerDetails extends ShramSevakUserDetails {

	private Worker worker;
	
	@Override
	public String getPassword() {
		return worker.getPassword();
	}

	@Override
	public String getUsername() {
		return worker.getContact();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return worker.getRoles()
				.stream()
				.map(role -> new SimpleGrantedAuthority(role.getRoleName().name()))
				.collect(Collectors.toSet());
	}

	
}
