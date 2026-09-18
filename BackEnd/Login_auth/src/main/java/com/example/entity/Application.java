package com.example.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "application")
@Data
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(name = "enrollment_number", nullable = false)
    private String enrollmentNumber;

    @Column(name = "full_name")
    private String fullName;

    private String hometown;
    private String category;

    private String company;
    private String role;

    @Column(name = "applied_date")
    private LocalDate appliedDate;

    @Column(name = "aptitude_status")
    private String aptitudeStatus = "Pending";   // Pending | Pass | Fail

    @Column(name = "technical_status")
    private String technicalStatus = "Pending";  // Pending | Pass | Fail

    @Column(name = "hr_status")
    private String hrStatus = "Pending";         // Pending | Pass | Fail

    @Column(name = "overall_status")
    private String overallStatus = "Under Review"; // Under Review | Selected | Rejected
}