package com.example.dto;

import lombok.Data;

@Data
public class AcademicDetailsRequest {
    private String department;
    private String semester;
    private String mobileNumber;
    private String gender;
    private String division;
    private String cgpaSem1;
    private String cgpaSem2;
    private String backlog;
    private String hometown;
    private String address;
    
    private String skill1;
    private String skill2;
}