package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponse {
    private String name;
    private String email;
    private String mobileNumber;
    private String enrollmentNumber;
    private String photoUrl;
}