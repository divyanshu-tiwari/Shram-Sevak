package com.shramsevak.shramSevak.security;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.shramsevak.shramSevak.dto.ShramSevakUserDetailsDTO;
import com.shramsevak.shramSevak.jwtUtils.JwtUtils;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JWTRequestFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtils utils;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String authHeader = request.getHeader("Authorization");
		
		if(authHeader != null && authHeader.startsWith("Bearer")) {
			log.info("bearer token retrieved.");
			// validate token
			String token = authHeader.substring(7);
			// get claims from token
			Claims claims = utils.validateJwtToken(token);
			// get details from claims
			String username = utils.getUserNameFromJwtToken(claims);
			List<GrantedAuthority> authorities = utils.getAuthoritiesFromClaims(claims);
			ShramSevakUserDetailsDTO userDTO = new ShramSevakUserDetailsDTO(username, utils.getUserIdFromClaims(claims));
			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDTO, null, authorities);
			SecurityContextHolder.getContext().setAuthentication(authentication);
		} else {
			log.info("Request contains no bearer token");
		}
		
		filterChain.doFilter(request, response);
		
	}

}
