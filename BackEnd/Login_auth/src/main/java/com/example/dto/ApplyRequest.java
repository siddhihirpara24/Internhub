package com.example.dto;

import lombok.Data;

@Data
public class ApplyRequest {
    private String company;
    private String role;
    private String enrollmentNumber;
    private String fullName;
    private String hometown;
    private String category;
}