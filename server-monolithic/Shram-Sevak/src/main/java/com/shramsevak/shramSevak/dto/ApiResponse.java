package com.shramsevak.shramSevak.dto;


import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ApiResponse {
    private LocalDateTime timeStamp;
    private String message;

    public ApiResponse(String message) {
        super();
        this.message = message;
        this.timeStamp = LocalDateTime.now();
    }
}