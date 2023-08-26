package com.shramsevak.shramSevak.globalException;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.shramsevak.shramSevak.customException.AdminException;
import com.shramsevak.shramSevak.customException.OrderException;
import com.shramsevak.shramSevak.customException.ResourceNotFoundException;
import com.shramsevak.shramSevak.dto.ApiResponse;

@RestControllerAdvice 
public class GlobalExceptionHandler {
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
		System.out.println("in method arg invalid123 " + e);
		List<FieldError> fieldErrors = e.getFieldErrors();
		Map<String, String> map = fieldErrors.stream()
				.collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
	}

	
	@ExceptionHandler(ResourceNotFoundException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public ApiResponse handleResourceNotFoundException(
			ResourceNotFoundException e) {
		System.out.println("in res not found " + e);
		return new ApiResponse(e.getMessage());
	}
	
	@ExceptionHandler(AdminException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public ApiResponse handleAdminException(
			AdminException e) {
		System.out.println("in res not found " + e);
		return new ApiResponse(e.getMessage());
	}
	
	@ExceptionHandler(OrderException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public ApiResponse handleOrderException(OrderException e) {
		System.out.println("in res not found " + e);
		return new ApiResponse(e.getMessage());
	}
		
	@ExceptionHandler(RuntimeException.class)
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	public ApiResponse handleAnyException(RuntimeException e) {
		System.out.println("in catch-all " + e);
		return new ApiResponse(e.getMessage());
	}
	
	
	
}
