package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AcademicDetailsResponse {
	
    private String fullName;
    private String email;
    private String enrollmentNumber;
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
    private int completionPercentage;
    
    private String resumeUrl;
    private String photoUrl;
}