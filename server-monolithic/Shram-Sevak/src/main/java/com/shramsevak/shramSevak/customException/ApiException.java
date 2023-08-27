package com.shramsevak.shramSevak.customException;

@SuppressWarnings("serial")
public class ApiException extends RuntimeException {
	public ApiException(String mesg) {
		super(mesg);
	}

}
