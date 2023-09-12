package com.shramsevak.shramSevak.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.shramsevak.shramSevak.customException.AdminException;
import com.shramsevak.shramSevak.entity.Admin;
import com.shramsevak.shramSevak.repository.AdminRepository;

public class AdminUserDetailsService implements UserDetailsService {
	
	@Autowired
	private AdminRepository adminRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Admin admin = adminRepo.findByUserName(username).orElseThrow(() -> new AdminException("No such user found."));
		return new ShramSevakUserDetails(admin);
	}

}
