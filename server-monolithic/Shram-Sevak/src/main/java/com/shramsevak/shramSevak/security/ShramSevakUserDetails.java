package com.shramsevak.shramSevak.security;

import org.springframework.security.core.userdetails.UserDetails;

@SuppressWarnings("serial")
public abstract class ShramSevakUserDetails implements UserDetails {

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
