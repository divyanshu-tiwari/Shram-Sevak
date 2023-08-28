package com.shramsevak.shramSevak.entity;

import java.util.Set;

public interface ShramSevakUser {
	public Long getId();
	public String getUsername();
	public String getPassword();
	public ShramSevakUser getUser();
	public Set<Role> getRoles();
}
