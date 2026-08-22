package com.example.repository;

import com.example.entity.AcademicDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AcademicDetailsRepository extends JpaRepository<AcademicDetails, Long> {
    Optional<AcademicDetails> findByEmail(String email);
}