package com.example.repository;

import com.example.entity.OptOutRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptOutRequestRepository extends JpaRepository<OptOutRequest, Long> {
    
    // Prevents duplicate submissions by checking if the ID already exists!
    boolean existsByRegistrationId(Long registrationId);
}