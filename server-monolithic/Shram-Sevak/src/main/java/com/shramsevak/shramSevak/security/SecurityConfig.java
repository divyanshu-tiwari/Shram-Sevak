package com.shramsevak.shramSevak.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.shramsevak.shramSevak.repository.AdminRepository;
import com.shramsevak.shramSevak.service.AdminService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	
	@Configuration
	@Order(1)
	public static class AdminSecurityConfig {
	
		@Autowired
		private JWTRequestFilter jwtRequestFilter;
		
		@Autowired
		private AdminRepository adminRepo;
		
		@Bean
		public SecurityFilterChain authorizeRequest(HttpSecurity http) throws Exception {
			http
			.csrf(csrf -> csrf.disable())
			.authorizeHttpRequests(authz -> authz
					.requestMatchers("/admin**/**", 
							"/category/add",
							"/category/update",
							"/category/delete**",
							"/skill/add",
							"/skill/update",
							"/skill/delete**",
							"/state/add",
							"/state/update",
							"/state/delete**",
							"/city/add",
							"/city/update",
							"/city/delete**",
							"/locality/add",
							"/locality/update",
							"/locality/delete**").hasRole("ADMIN")
					.anyRequest().authenticated())
			.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
			
			return http.build();
		}
		
		@Bean
		public UserDetailsService AdminUserDetailService() {
			UserDetails user = adminRepo.
		}
	}
	
	
	@Configuration
	@Order(2)
	public static class CustomerSecurityConfig {
	
		@Autowired
		private JWTRequestFilter jwtRequestFilter;
		
		@Bean
		public SecurityFilterChain authorizeRequest(HttpSecurity http) throws Exception {
			http
			.csrf(csrf -> csrf.disable())
			.authorizeHttpRequests(authz -> authz
					.requestMatchers("/admin").hasRole("ADMIN")
//					.requestMatchers("")
					.anyRequest().authenticated()
					
					)
			.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
			
			return http.build();
		}
	}
	
	
	@Configuration
	@Order(3)
	public static class WorkerSecurityConfig {
	
		@Autowired
		private JWTRequestFilter jwtRequestFilter;
		
		@Bean
		public SecurityFilterChain authorizeRequest(HttpSecurity http) throws Exception {
			http
			.csrf(csrf -> csrf.disable())
			.authorizeHttpRequests(authz -> authz
					.requestMatchers("/admin").hasRole("ADMIN")
//					.requestMatchers("")
					.anyRequest().authenticated()
					
					)
			.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
			
			return http.build();
		}
	}
	
}
