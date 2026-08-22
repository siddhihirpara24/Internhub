package com.example.repository;

import com.example.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    // You can add custom queries here later if needed (e.g., findByCompanyName)
}