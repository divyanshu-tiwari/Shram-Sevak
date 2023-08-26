package com.shramsevak.shramSevak.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {

	@Bean
	public OpenAPI openApiService() {
		return new OpenAPI().info(new Info().title("API Title").description("API Description").version("1.0"));
	}
}
