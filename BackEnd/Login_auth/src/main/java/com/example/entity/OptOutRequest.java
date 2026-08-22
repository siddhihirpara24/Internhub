package com.example.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "opt_out")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OptOutRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "registration_id", nullable = false)
    private Long registrationId;

    @Column(name = "academic_id", nullable = false)
    private Long academicId;

    @Column(nullable = false)
    private String reason;

    @Column(name = "detailed_reason", nullable = false, columnDefinition = "TEXT")
    private String detailedReason;
}