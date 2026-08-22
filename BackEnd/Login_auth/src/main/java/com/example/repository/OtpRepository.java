package com.example.repository;

import com.example.entity.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;
/**/
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
/**/
import java.util.Optional;

public interface OtpRepository extends JpaRepository<OtpVerification, Long> {
    Optional<OtpVerification> findTopByEmailOrderByIdDesc(String email);
   /**/
    @Modifying
    @Transactional
   /**/
    void deleteByEmail(String email);
}