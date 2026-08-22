package com.example.repository;

import com.example.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Registration, Long> {
    Optional<Registration> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByEnrollmentNumber(String enrollmentNumber);
}