package com.example.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "registration")
@Data
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "enrollment_number", unique = true)
    private String enrollmentNumber;

    @Column(unique = true)
    private String email;
    
    @Column(name = "mobile_number")
    private String mobileNumber;

    private String password; // stored as hashed value
    
    @Column(nullable = false)
    private String role = "STUDENT";  // default for every new registration
}
