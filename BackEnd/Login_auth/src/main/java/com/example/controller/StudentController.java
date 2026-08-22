package com.example.controller;

import com.example.dto.*;
import com.example.service.AcademicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile; 
import java.io.IOException;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    private AcademicService academicService;

    @GetMapping("/academic")
    public AcademicDetailsResponse getAcademic(Authentication authentication) {
        String email = authentication.getName();
        return academicService.getAcademicDetails(email);
    }

    @PostMapping("/academic")
    public AcademicDetailsResponse saveAcademic(Authentication authentication,
                                                 @RequestBody AcademicDetailsRequest request) {
        String email = authentication.getName();
        return academicService.saveAcademicDetails(email, request);
    }
    
    @PostMapping("/academic/upload-resume")
    public AcademicDetailsResponse uploadResume(Authentication authentication,
                                                 @RequestParam("file") MultipartFile file) throws IOException {
        return academicService.uploadResume(authentication.getName(), file);
    }

    @PostMapping("/academic/upload-photo")
    public AcademicDetailsResponse uploadPhoto(Authentication authentication,
                                                @RequestParam("file") MultipartFile file) throws IOException {
        return academicService.uploadPhoto(authentication.getName(), file);
    }
    
    @GetMapping("/profile")
    public ProfileResponse getProfile(Authentication authentication) {
        return academicService.getProfile(authentication.getName());
    }
}