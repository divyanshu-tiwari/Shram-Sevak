package com.shramsevak.shramSevak.util;

import com.shramsevak.shramSevak.entity.Worker;

public class Utils {
	
	public static void checkStatus(Worker worker) {
		
		
		if(!worker.getStatus().name().equals("ACTIVE")) {
			throw new RuntimeException("Invalid worker ID");
		}
		
		
	}

}
