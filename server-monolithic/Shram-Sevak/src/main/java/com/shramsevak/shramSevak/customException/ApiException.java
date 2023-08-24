package com.shramsevak.shramSevak.customException;

public class ApiException extends RuntimeException {
	public ApiException(String mesg) {
		super(mesg);
	}

}
