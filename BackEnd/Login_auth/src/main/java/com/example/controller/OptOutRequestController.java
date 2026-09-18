package com.example.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.OptOutRequestDto;
import com.example.entity.OptOutRequest;
import com.example.service.OptOutRequestService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/opt-out")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OptOutRequestController {

    private final OptOutRequestService optOutRequestService;

    @PostMapping
    public ResponseEntity<?> submitOptOut(
            @RequestBody OptOutRequestDto dto,
            Authentication authentication) {

        try {
            // JWT mathi logged-in student's email
            String email = authentication.getName();

            OptOutRequest saved = optOutRequestService.saveRequest(email, dto);

            return ResponseEntity.ok(saved);

        } catch (RuntimeException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
    
    @GetMapping("/student-details")
    public ResponseEntity<?> getStudentDetails(Authentication authentication) {
        try {
            // Get email from secure JWT
            String email = authentication.getName();

            return ResponseEntity.ok(optOutRequestService.getStudentDetails(email));

        } catch (RuntimeException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllOptOutRequests() {
        try {
            return ResponseEntity.ok(optOutRequestService.getAllOptOutRequests());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/check")
    public ResponseEntity<?> checkOptOutStatus(Authentication authentication) {
        try {
            String email = authentication.getName();
            boolean optedOut = optOutRequestService.hasOptedOut(email);
            return ResponseEntity.ok(java.util.Map.of("optedOut", optedOut));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    
    @org.springframework.web.bind.annotation.DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOptOutRequest(@PathVariable Long id) {
        try {
            optOutRequestService.deleteRequest(id);
            return ResponseEntity.ok("Deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}