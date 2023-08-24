package com.shramsevak.shramSevak.customException;

@SuppressWarnings("serial")
public class OrderException extends RuntimeException {
	public OrderException (String msg) {
		super(msg);
	}

}
