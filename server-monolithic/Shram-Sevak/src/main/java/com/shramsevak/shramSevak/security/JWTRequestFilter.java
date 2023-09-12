package com.shramsevak.shramSevak.security;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.shramsevak.shramSevak.dto.ShramSevakUserDetailsDTO;
import com.shramsevak.shramSevak.jwtUtils.JwtUtils;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JWTRequestFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtils utils;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String authHeader = request.getHeader("Authorization");
		log.info(authHeader);
		
		if(authHeader != null && authHeader.startsWith("Bearer")) {
			log.info("bearer token retrieved.");
			// validate token
			log.info("getting the token");
			String token = authHeader.substring(7);
			log.info("got the token...preparing for parsing");
			// get claims from token
			Claims claims = utils.validateJwtToken(token);
			log.info("parsed the claims from token");
			// get details from claims
			String username = utils.getUserNameFromJwtToken(claims);
			log.info("got username from claims");
			List<GrantedAuthority> authorities = utils.getAuthoritiesFromClaims(claims);
			log.info("got authorities from claims");
			ShramSevakUserDetailsDTO userDTO = new ShramSevakUserDetailsDTO(username, utils.getUserIdFromClaims(claims));
			log.info("UserDetails created from the the info");
			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDTO, null, authorities);
			log.info("authentication token set up successfull");
			SecurityContextHolder.getContext().setAuthentication(authentication);
			log.info("placed the token in security context");
		} else {
			log.info("Request contains no bearer token");
		}
		
		filterChain.doFilter(request, response);
		
	}

}
