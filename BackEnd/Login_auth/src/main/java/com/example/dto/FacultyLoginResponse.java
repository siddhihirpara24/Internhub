package com.example.dto;

public class FacultyLoginResponse {
    private String message;
    private String token; // For later JWT integration

    public FacultyLoginResponse(String message, String token) {
        this.message = message;
        this.token = token;
    }

    public String getMessage() { return message; }
    public String getToken() { return token; }
}