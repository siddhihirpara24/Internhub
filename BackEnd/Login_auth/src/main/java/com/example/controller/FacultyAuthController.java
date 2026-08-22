package com.example.controller;

import com.example.dto.FacultyLoginRequest;
import com.example.dto.FacultyLoginResponse;
import com.example.entity.Faculty;
import com.example.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/faculty")
@CrossOrigin(origins = "http://localhost:5173") // Allows your React frontend to connect
public class FacultyAuthController {

    @Autowired
    private FacultyRepository facultyRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // --- NEW: Registration API to easily add users to the database ---
    @PostMapping("/register")
    public ResponseEntity<?> registerFaculty(@RequestBody FacultyLoginRequest request) {
        
        // 1. Check if username already exists in the database
        if (facultyRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body(new FacultyLoginResponse("Username already exists", null));
        }

        // 2. Create new faculty user
        Faculty newFaculty = new Faculty();
        newFaculty.setUsername(request.getUsername());
        
        // 3. Encrypt the password securely before saving
        newFaculty.setPassword(passwordEncoder.encode(request.getPassword()));
        
        // 4. Save to PostgreSQL database
        facultyRepository.save(newFaculty);
        
        return ResponseEntity.ok(new FacultyLoginResponse("User registered successfully!", null));
    }

    // --- EXISTING: Login API ---
    @PostMapping("/login")
    public ResponseEntity<?> loginFaculty(@RequestBody FacultyLoginRequest request) {
        
        Optional<Faculty> facultyOptional = facultyRepository.findByUsername(request.getUsername());
        
        if (facultyOptional.isPresent()) {
            Faculty faculty = facultyOptional.get();
            
            // Compare plain text password from React with Hashed password in DB
            if (passwordEncoder.matches(request.getPassword(), faculty.getPassword())) {
                
                // Login Success!
            	String realUsername = faculty.getUsername(); 
                return ResponseEntity.ok(new FacultyLoginResponse("Login Successful!", realUsername));
            }
        }
        
        // Login Failed
        return ResponseEntity.badRequest().body(new FacultyLoginResponse("Invalid username or password", null));
    }
    
 // --- NEW: API to fetch the Faculty Profile from the Database! ---
    @GetMapping("/profile/{username}")
    public ResponseEntity<?> getFacultyProfile(@PathVariable String username) {
        Optional<Faculty> facultyOptional = facultyRepository.findByUsername(username);
        
        if (facultyOptional.isPresent()) {
            return ResponseEntity.ok(facultyOptional.get());
        }
        return ResponseEntity.notFound().build();
    }
}