package com.example.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String enrollmentNumber;
    private String email;
    private String mobileNumber;
    private String password;
    private String confirmPassword;
}