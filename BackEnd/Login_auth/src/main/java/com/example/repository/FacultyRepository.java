package com.example.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entity.Faculty;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    Optional<Faculty> findByUsername(String username);
}