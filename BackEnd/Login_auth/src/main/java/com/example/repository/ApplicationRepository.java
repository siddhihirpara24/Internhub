package com.example.repository;

import com.example.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByEmail(String email);
    Optional<Application> findByEmailAndCompanyAndRole(String email, String company, String role);
    List<Application> findByCompanyIgnoreCase(String company);   // ← new
}