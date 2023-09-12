package com.shramsevak.shramSevak.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Configuration
	@Order(1)
	public static class AdminSecurityConfig {

		@Autowired
		private JWTRequestFilter jwtRequestFilter;

		@Bean
		SecurityFilterChain authorizeRequest(HttpSecurity http) throws Exception {
			http.csrf(csrf -> csrf.disable())
					.authorizeHttpRequests(authz -> authz.requestMatchers("/admin/signin", "/admin/register").permitAll()
							.requestMatchers("/admin**/**", "/category/add", "/category/update", "/category/delete**",
									"/skill/add", "/skill/update", "/skill/delete**", "/state/add", "/state/update",
									"/state/delete**", "/city/add", "/city/update", "/city/delete**", "/locality/add",
									"/locality/update", "/locality/delete**")
							.hasRole("ADMIN").anyRequest().authenticated())
					.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
					.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

			return http.build();
		}

		@Bean
		UserDetailsService AdminUserDetailService() {
			return new AdminUserDetailsService();
		}

		@Bean
		PasswordEncoder passwordEncoder() {
			return new BCryptPasswordEncoder();
		}
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

	/*
	 * @Configuration
	 * 
	 * @Order(2) public static class CustomerSecurityConfig {
	 * 
	 * @Autowired private JWTRequestFilter jwtRequestFilter;
	 * 
	 * @Bean public SecurityFilterChain authorizeRequest(HttpSecurity http) throws
	 * Exception { http .csrf(csrf -> csrf.disable()) .authorizeHttpRequests(authz
	 * -> authz .requestMatchers("/admin").hasRole("ADMIN") // .requestMatchers("")
	 * .anyRequest().authenticated()
	 * 
	 * ) .sessionManagement(session ->
	 * session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	 * .addFilterBefore(jwtRequestFilter,
	 * UsernamePasswordAuthenticationFilter.class);
	 * 
	 * return http.build(); } }
	 * 
	 * 
	 * @Configuration
	 * 
	 * @Order(3) public static class WorkerSecurityConfig {
	 * 
	 * @Autowired private JWTRequestFilter jwtRequestFilter;
	 * 
	 * @Bean public SecurityFilterChain authorizeRequest(HttpSecurity http) throws
	 * Exception { http .csrf(csrf -> csrf.disable()) .authorizeHttpRequests(authz
	 * -> authz .requestMatchers("/admin").hasRole("ADMIN") // .requestMatchers("")
	 * .anyRequest().authenticated()
	 * 
	 * ) .sessionManagement(session ->
	 * session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	 * .addFilterBefore(jwtRequestFilter,
	 * UsernamePasswordAuthenticationFilter.class);
	 * 
	 * return http.build(); } }
	 */
}
