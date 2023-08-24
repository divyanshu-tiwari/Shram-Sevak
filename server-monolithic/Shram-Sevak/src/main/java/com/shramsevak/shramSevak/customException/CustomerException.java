package com.shramsevak.shramSevak.customException;

@SuppressWarnings("serial")
public class CustomerException extends RuntimeException {
    public CustomerException(String msg) {
    	super(msg);
    }
}
