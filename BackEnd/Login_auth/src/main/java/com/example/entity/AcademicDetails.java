package com.example.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "academic_details")
@Data
public class AcademicDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String department;
    private String semester;
    private String mobileNumber;
    private String gender;
    private String division;

    @Column(name = "cgpa_sem1")
    private String cgpaSem1;

    @Column(name = "cgpa_sem2")
    private String cgpaSem2;

    private String backlog;
    private String hometown;
    private String address;
    
    @Column(name = "resume_path")
    private String resumePath;

    @Column(name = "photo_path")
    private String photoPath;
}